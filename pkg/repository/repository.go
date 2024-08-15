package repository

import (
	"github.com/jmoiron/sqlx"
	"online_chat/pkg/domain/models"
	"online_chat/pkg/repository/sql/message"
	"online_chat/pkg/repository/sql/user"
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
	GetAll() ([]models.Message, error)
	GetPart(id int) ([]models.Message, error)
	Create(message models.Message) (int, error)
}

type UserRepository interface {
	Create(user *models.User) (int, error)
	Get(username, password string) (models.User, error)
	AddTokenToBlacklist(refreshToken string, expiresAt time.Time) error
	TokenInBlackList(refreshToken string) bool
}
