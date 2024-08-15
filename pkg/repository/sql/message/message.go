package message

import (
	"fmt"
	"github.com/jmoiron/sqlx"
	"online_chat/pkg/domain/models"
	"sync"
	"time"
)

const (
	MessagesTable = "messages"
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

func (r *MessageRepository) Create(message models.Message) (int, error) {
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

func (r *MessageRepository) GetAll() ([]models.Message, error) {
	r.m.RLock()
	defer r.m.RUnlock()

	var messages []models.Message
	query := fmt.Sprintf("SELECT * FROM %s ORDER BY send_at", MessagesTable)
	if err := r.db.Select(&messages, query); err != nil {
		return messages, err
	}

	return messages, nil
}

func (r *MessageRepository) GetPart(lastID int) ([]models.Message, error) {
	r.m.RLock()
	defer r.m.RUnlock()

	var messages []models.Message
	var query string
	query = fmt.Sprintf(
		"SELECT * "+
			"FROM %s "+
			"WHERE id < $1 "+
			"ORDER BY send_at DESC "+
			"LIMIT 50;", MessagesTable)
	if err := r.db.Select(&messages, query, lastID); err != nil {
		return messages, err
	}

	return messages, nil
}
