package model

import (
	"database/sql"
	"time"
)

type Message struct {
	Id            int           `json:"id" db:"id"`
	Event         string        `json:"event" db:"event"`
	Message       string        `json:"message" db:"text" binding:"required"`
	AuthorID      sql.NullInt64 `json:"author_id" db:"author_id"`
	AuthorName    string        `json:"author_name" db:"author_name" binding:"required"`
	SendAt        time.Time     `json:"send_at" db:"send_at"`
	LikesCount    int           `json:"likes_count" db:"likes_count"`
	DislikesCount int           `json:"dislikes_count" db:"dislikes_count"`
}

type History struct {
	Event    string    `json:"event"`
	Messages []Message `json:"messages"`
}
