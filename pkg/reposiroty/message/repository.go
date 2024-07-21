package message

import (
	"fmt"
	"github.com/jmoiron/sqlx"
	"online_chat/pkg/model"
	"sync"
	"time"
)

const (
	MessagesTable = "messages"
	UsersTable    = "users"
)

type MessageRepository struct {
	db *sqlx.DB
	m  sync.RWMutex
}

func NewMessageRepository(db *sqlx.DB) *MessageRepository {
	return &MessageRepository{
		db: db,
	}
}

func (r *MessageRepository) Create(message model.Message) (int, error) {
	r.m.Lock()
	defer r.m.Unlock()

	var id int
	createItemQuery := fmt.Sprintf("INSERT INTO %s (event, text, author_id, author_name, send_at) VALUES ($1, $2, $3, $4, $5) RETURNING id", MessagesTable)
	row := r.db.QueryRow(createItemQuery, message.Event, message.Message, message.AuthorID, message.AuthorName, time.Now())
	if err := row.Scan(&id); err != nil {
		return 0, err
	}

	return id, nil
}

func (r *MessageRepository) GetAll() ([]model.Message, error) {
	r.m.RLock()
	defer r.m.RUnlock()

	var messages []model.Message
	query := fmt.Sprintf("SELECT * FROM %s ORDER BY send_at", MessagesTable)
	if err := r.db.Select(&messages, query); err != nil {
		return messages, err
	}

	return messages, nil
}

func (r *MessageRepository) GetPart(lastID int) ([]model.Message, error) {
	r.m.RLock()
	defer r.m.RUnlock()

	var messages []model.Message
	var query string
	query = fmt.Sprintf(
		"WITH messages_below_id AS ("+
			"SELECT * "+
			"FROM %s "+
			"WHERE id < $1 "+
			"ORDER BY id DESC "+
			"LIMIT 10"+
			") "+
			"SELECT * "+
			"FROM messages_below_id "+
			"ORDER BY send_at DESC;", MessagesTable)
	if err := r.db.Select(&messages, query, lastID); err != nil {
		return messages, err
	}

	return messages, nil
}
