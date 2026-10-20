from datetime import datetime, timezone
from typing import Any

from sqlalchemy.orm import relationship, validates

from . import db
from .base import BaseModel

MAX_COMMENT_LENGTH = 1000


class Comment(BaseModel):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    game_id = db.Column(db.Integer, db.ForeignKey('games.id'), nullable=False, index=True)
    text = db.Column(db.String(MAX_COMMENT_LENGTH), nullable=False)
    author = db.Column(db.String(20), nullable=False, default='Anonymous')
    created_at = db.Column(
        db.DateTime(timezone=True),
        nullable=False,
        default=lambda: datetime.now(timezone.utc),
    )

    game = relationship('Game', back_populates='comments')

    @validates('text')
    def validate_text(self, key: str, value: object) -> str:
        if not isinstance(value, str):
            raise ValueError('Comment must be a string')

        text = value.strip()
        if not text:
            raise ValueError('Comment cannot be blank')
        if len(text) > MAX_COMMENT_LENGTH:
            raise ValueError(f'Comment must be at most {MAX_COMMENT_LENGTH} characters')

        return text

    def __repr__(self) -> str:
        return f'<Comment for game {self.game_id}, ID: {self.id}>'

    def to_dict(self) -> dict[str, Any]:
        created_at = self.created_at
        if created_at.tzinfo is None:
            created_at = created_at.replace(tzinfo=timezone.utc)

        return {
            'id': self.id,
            'gameId': self.game_id,
            'text': self.text,
            'author': self.author,
            'createdAt': created_at.isoformat(),
        }
