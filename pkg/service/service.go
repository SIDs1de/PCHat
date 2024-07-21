package service

import (
	"online_chat/pkg/model"
	"online_chat/pkg/reposiroty"
	"online_chat/pkg/service/message"
	"online_chat/pkg/service/tokens"
	"online_chat/pkg/service/user"
	"time"
)

type Service struct {
	MessageService
	UserService
	TokenService
}

func NewService(repo *reposiroty.Repository) *Service {
	return &Service{
		MessageService: message.NewMessageService(repo.MessageRepository),
		UserService:    user.NewUserService(repo.UserRepository),
		TokenService:   tokens.NewTokenService(repo.UserRepository),
	}
}

type MessageService interface {
	GetAll() ([]model.Message, error)
	GetPart(id int) ([]model.Message, error)
	Create(message model.Message) (int, error)
}

type UserService interface {
	Create(user *model.User) (int, error)
}

type TokenService interface {
	GenerateTokens(username, password string) (string, string, error)
	ParseRefreshToken(refreshToken string) (time.Time, error)
	ParseAccessToken(accessToken string) (int, error)
	AddTokenToBlacklist(refreshToken string, expiresAt time.Time) error
}
