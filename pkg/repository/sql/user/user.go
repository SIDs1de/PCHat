package user

import (
	"fmt"
	"github.com/jmoiron/sqlx"
	"online_chat/pkg/domain/models"
	"sync"
	"time"
)

const (
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

func (r *UserRepository) Create(user *models.User) (int, error) {
	var id int

	query := fmt.Sprintf("INSERT INTO %s (name, login, password_hash) VALUES ($1, $2, $3) RETURNING id", UsersTable)
	row := r.db.QueryRow(query, user.Name, user.Login, user.Password)

	if err := row.Scan(&id); err != nil {
		return 0, err
	}

	return id, nil
}

func (r *UserRepository) Get(login, password string) (models.User, error) {
	var user models.User

	query := fmt.Sprintf("SELECT * FROM %s WHERE login = $1 AND password_hash = $2", UsersTable)
	err := r.db.Get(&user, query, login, password)

	return user, err
}

func (r *UserRepository) AddTokenToBlacklist(refreshToken string, expiresAt time.Time) error {

	query := fmt.Sprintf("INSERT INTO %s (token, expires_at) VALUES ($1, $2)", TokensBlackList)
	_, err := r.db.Exec(query, refreshToken, expiresAt)
	if err != nil {
		return err
	}

	return nil
}

func (r *UserRepository) TokenInBlackList(refreshToken string) bool {
	query := fmt.Sprintf("SELECT * FROM %s WHERE token = $1", TokensBlackList)
	rows, _ := r.db.Query(query, refreshToken)

	if rows.Next() {
		return true
	}

	return false
}
