package user

import (
	"fmt"
	"github.com/jmoiron/sqlx"
	"online_chat/pkg/model"
	"sync"
	"time"
)

const (
	MessagesTable   = "messages"
	UsersTable      = "users"
	TokensBlackList = "token_blacklist"
)

type UserRepository struct {
	db *sqlx.DB
	m  sync.RWMutex
}

func NewUserRepository(db *sqlx.DB) *UserRepository {
	return &UserRepository{
		db: db,
	}
}

func (r *UserRepository) Create(user *model.User) (int, error) {
	var id int

	query := fmt.Sprintf("INSERT INTO %s (name, username, password_hash) VALUES ($1, $2, $3) RETURNING id", UsersTable)
	row := r.db.QueryRow(query, user.Name, user.Username, user.Password)

	if err := row.Scan(&id); err != nil {
		return 0, err
	}

	return id, nil
}

func (r *UserRepository) Get(username, password string) (model.User, error) {
	var user model.User

	query := fmt.Sprintf("SELECT * FROM %s WHERE username = $1 AND password_hash = $2", UsersTable)
	err := r.db.Get(&user, query, username, password)

	return user, err
}

func (r *UserRepository) AddTokenToBlacklist(refreshToken string, expiresAt time.Time) error {

	query := fmt.Sprintf("INSERT INTO %s (tokens, expires_at) VALUES ($1, $2)", TokensBlackList)
	_, err := r.db.Exec(query, refreshToken, expiresAt)
	if err != nil {
		return err
	}

	return nil
}

func (r *UserRepository) TokenInBlackList(refreshToken string) bool {
	query := fmt.Sprintf("SELECT * FROM %s WHERE token = $1", TokensBlackList)
	_, err := r.db.Exec(query, refreshToken)

	if err != nil {
		return false
	}

	return true
}
