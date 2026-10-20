import json
import unittest
from typing import Any
from unittest.mock import patch

from flask import Flask, Response

from models import Category, Comment, Game, Publisher, db
from routes.comments import comments_bp


class TestCommentsRoutes(unittest.TestCase):
    """Tests for game comment retrieval, creation, validation, and rate limits."""

    TEST_DATA: dict[str, Any] = {
        'publishers': [{'name': 'DevGames Inc'}, {'name': 'Scrum Masters'}],
        'categories': [{'name': 'Strategy'}, {'name': 'Card Game'}],
        'games': [
            {
                'title': 'Pipeline Panic',
                'description': 'Build your DevOps pipeline before chaos ensues',
                'publisher_index': 0,
                'category_index': 0,
            },
            {
                'title': 'Agile Adventures',
                'description': 'Navigate your team through sprints and releases',
                'publisher_index': 1,
                'category_index': 1,
            },
        ],
    }
    COMMENTS_API_PATH = '/api/games/{game_id}/comments'

    def setUp(self) -> None:
        """Create an isolated in-memory app and seed two games."""
        self.app = Flask(__name__)
        self.app.config['TESTING'] = True
        self.app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
        self.app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
        self.app.register_blueprint(comments_bp)
        db.init_app(self.app)
        self.client = self.app.test_client()

        with self.app.app_context():
            db.create_all()
            publishers = [Publisher(**item) for item in self.TEST_DATA['publishers']]
            categories = [Category(**item) for item in self.TEST_DATA['categories']]
            db.session.add_all(publishers + categories)
            db.session.commit()

            games = []
            for game_data in self.TEST_DATA['games']:
                values = game_data.copy()
                publisher = publishers[values.pop('publisher_index')]
                category = categories[values.pop('category_index')]
                games.append(Game(**values, publisher=publisher, category=category))
            db.session.add_all(games)
            db.session.commit()
            self.game_ids = [game.id for game in games]

    def tearDown(self) -> None:
        """Remove test database state and dispose of its engine."""
        with self.app.app_context():
            db.session.remove()
            db.drop_all()
            db.engine.dispose()

    def _get_response_data(self, response: Response) -> Any:
        """Decode a JSON response body."""
        return json.loads(response.data)

    def _post_comment(self, game_id: int, text: str, remote_addr: str = '192.0.2.1') -> Response:
        """Submit a comment from a chosen test client IP address."""
        return self.client.post(
            self.COMMENTS_API_PATH.format(game_id=game_id),
            json={'text': text},
            environ_overrides={'REMOTE_ADDR': remote_addr},
        )

    def test_get_comments_returns_empty_collection(self) -> None:
        """Return an empty collection for a game without comments."""
        response = self.client.get(self.COMMENTS_API_PATH.format(game_id=self.game_ids[0]))

        self.assertEqual(response.status_code, 200)
        self.assertEqual(self._get_response_data(response), {'comments': []})

    def test_create_comment_persists_and_returns_anonymous_author(self) -> None:
        """Save a trimmed comment and return its author and creation time."""
        response = self._post_comment(self.game_ids[0], '  I love this game!  ')
        body = self._get_response_data(response)

        self.assertEqual(response.status_code, 201)
        self.assertEqual(body['comment']['text'], 'I love this game!')
        self.assertEqual(body['comment']['author'], 'Anonymous')
        self.assertTrue(body['comment']['createdAt'])

        reloaded = self.client.get(self.COMMENTS_API_PATH.format(game_id=self.game_ids[0]))
        self.assertEqual(self._get_response_data(reloaded)['comments'], [body['comment']])
        with self.app.app_context():
            self.assertEqual(db.session.query(Comment).count(), 1)

    def test_comments_are_isolated_by_game_and_return_in_creation_order(self) -> None:
        """Return each comment only from its game, oldest first."""
        first = self._post_comment(self.game_ids[0], 'First comment').get_json()['comment']
        second = self._post_comment(self.game_ids[0], 'Second comment').get_json()['comment']
        other = self._post_comment(self.game_ids[1], 'Different game').get_json()['comment']

        game_comments = self.client.get(
            self.COMMENTS_API_PATH.format(game_id=self.game_ids[0])
        ).get_json()['comments']
        other_comments = self.client.get(
            self.COMMENTS_API_PATH.format(game_id=self.game_ids[1])
        ).get_json()['comments']

        self.assertEqual([comment['id'] for comment in game_comments], [first['id'], second['id']])
        self.assertEqual([comment['id'] for comment in other_comments], [other['id']])

    def test_create_comment_rejects_blank_or_non_string_text(self) -> None:
        """Reject missing, non-string, and whitespace-only comment bodies."""
        for payload in ({'text': '  '}, {'text': 123}, {}):
            with self.subTest(payload=payload):
                response = self.client.post(
                    self.COMMENTS_API_PATH.format(game_id=self.game_ids[0]),
                    json=payload,
                    environ_overrides={'REMOTE_ADDR': '192.0.2.2'},
                )
                self.assertEqual(response.status_code, 400)

    def test_create_comment_rejects_text_over_maximum_length(self) -> None:
        """Reject a comment longer than the documented 1000-character limit."""
        response = self._post_comment(self.game_ids[0], 'x' * 1001)

        self.assertEqual(response.status_code, 400)
        self.assertIn('1000 characters', self._get_response_data(response)['error'])

    def test_comments_endpoints_return_not_found_for_unknown_game(self) -> None:
        """Return 404 instead of accepting or listing comments for a missing game."""
        get_response = self.client.get(self.COMMENTS_API_PATH.format(game_id=999))
        post_response = self._post_comment(999, 'A valid-length comment')

        self.assertEqual(get_response.status_code, 404)
        self.assertEqual(post_response.status_code, 404)

    def test_create_comment_limits_each_ip_to_five_per_minute(self) -> None:
        """Reject a sixth comment in one minute and keep the limit per IP."""
        for index in range(5):
            response = self._post_comment(
                self.game_ids[0],
                f'Comment {index}',
                remote_addr='192.0.2.3',
            )
            self.assertEqual(response.status_code, 201)

        limited = self._post_comment(
            self.game_ids[0],
            'One too many',
            remote_addr='192.0.2.3',
        )
        other_ip = self._post_comment(
            self.game_ids[0],
            'Different visitor',
            remote_addr='192.0.2.4',
        )

        self.assertEqual(limited.status_code, 429)
        self.assertGreater(int(limited.headers['Retry-After']), 0)
        self.assertEqual(other_ip.status_code, 201)

    def test_comment_rate_limit_expires_after_one_minute(self) -> None:
        """Allow a new comment when the oldest request leaves the rolling window."""
        with patch(
            'routes.comments.monotonic',
            side_effect=[0, 1, 2, 3, 4, 59, 60],
        ):
            for index in range(5):
                response = self._post_comment(
                    self.game_ids[0],
                    f'Comment {index}',
                    remote_addr='192.0.2.5',
                )
                self.assertEqual(response.status_code, 201)

            limited = self._post_comment(
                self.game_ids[0],
                'Still limited',
                remote_addr='192.0.2.5',
            )
            allowed = self._post_comment(
                self.game_ids[0],
                'Window has elapsed',
                remote_addr='192.0.2.5',
            )

        self.assertEqual(limited.status_code, 429)
        self.assertEqual(allowed.status_code, 201)


if __name__ == '__main__':
    unittest.main()
