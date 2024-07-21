package reposiroty

import (
	"github.com/jmoiron/sqlx"
	"online_chat/pkg/model"
	"online_chat/pkg/reposiroty/message"
	"online_chat/pkg/reposiroty/user"
	"time"
)

type Repository struct {
	MessageRepository
	UserRepository
}

func NewRepository(db *sqlx.DB) *Repository {
	return &Repository{
		MessageRepository: message.NewMessageRepository(db),
		UserRepository:    user.NewUserRepository(db),
	}
}

type MessageRepository interface {
	GetAll() ([]model.Message, error)
	GetPart(id int) ([]model.Message, error)
	Create(message model.Message) (int, error)
}

type UserRepository interface {
	Create(user *model.User) (int, error)
	Get(username, password string) (model.User, error)
	AddTokenToBlacklist(refreshToken string, expiresAt time.Time) error
}
