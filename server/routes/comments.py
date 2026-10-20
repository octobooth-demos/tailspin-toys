from collections import deque
from math import ceil
from threading import Lock
from time import monotonic

from flask import Blueprint, Response, current_app, jsonify, request
from flask.blueprints import BlueprintSetupState

from models import Comment, Game, db
from models.comment import MAX_COMMENT_LENGTH

comments_bp = Blueprint('comments', __name__)

COMMENTS_PER_MINUTE = 5
RATE_LIMIT_WINDOW_SECONDS = 60.0


class CommentRateLimiter:
    def __init__(self) -> None:
        self._requests: dict[str, deque[float]] = {}
        self._lock = Lock()

    def retry_after(self, client_ip: str | None) -> int | None:
        now = monotonic()
        address = client_ip or 'unknown'

        with self._lock:
            for ip, timestamps in list(self._requests.items()):
                while timestamps and now - timestamps[0] >= RATE_LIMIT_WINDOW_SECONDS:
                    timestamps.popleft()
                if not timestamps:
                    del self._requests[ip]

            timestamps = self._requests.setdefault(address, deque())
            if len(timestamps) >= COMMENTS_PER_MINUTE:
                return max(1, ceil(RATE_LIMIT_WINDOW_SECONDS - (now - timestamps[0])))

            timestamps.append(now)
            return None


@comments_bp.record_once
def initialize_comment_rate_limiter(state: BlueprintSetupState) -> None:
    state.app.extensions['comment_rate_limiter'] = CommentRateLimiter()


@comments_bp.route('/api/games/<int:game_id>/comments', methods=['GET'])
def get_game_comments(game_id: int) -> tuple[Response, int] | Response:
    game = db.session.get(Game, game_id)
    if game is None:
        return jsonify({'error': 'Game not found'}), 404

    comments = (
        db.session.query(Comment)
        .filter(Comment.game_id == game_id)
        .order_by(Comment.created_at.asc(), Comment.id.asc())
        .all()
    )
    return jsonify({'comments': [comment.to_dict() for comment in comments]})


@comments_bp.route('/api/games/<int:game_id>/comments', methods=['POST'])
def create_game_comment(game_id: int) -> tuple[Response, int] | Response:
    game = db.session.get(Game, game_id)
    if game is None:
        return jsonify({'error': 'Game not found'}), 404

    payload = request.get_json(silent=True)
    text = payload.get('text') if isinstance(payload, dict) else None
    if not isinstance(text, str) or not text.strip():
        return jsonify({'error': 'Comment text is required'}), 400

    text = text.strip()
    if len(text) > MAX_COMMENT_LENGTH:
        return jsonify({
            'error': f'Comment must be at most {MAX_COMMENT_LENGTH} characters',
        }), 400

    limiter: CommentRateLimiter = current_app.extensions['comment_rate_limiter']
    retry_after = limiter.retry_after(request.remote_addr)
    if retry_after is not None:
        response = jsonify({'error': 'Too many comments. Please try again shortly.'})
        response.headers['Retry-After'] = str(retry_after)
        return response, 429

    comment = Comment(game_id=game_id, text=text)
    db.session.add(comment)
    db.session.commit()
    return jsonify({'comment': comment.to_dict()}), 201
