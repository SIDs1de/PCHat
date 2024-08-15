package service

import (
	"online_chat/pkg/domain/models"
	"online_chat/pkg/repository"
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

func NewService(repo *repository.Repository) *Service {
	tokenService := tokens.NewTokenService(repo.UserRepository)
	return &Service{
		MessageService: message.NewMessageService(repo.MessageRepository),
		TokenService:   tokenService,
		UserService:    user.NewUserService(repo.UserRepository, tokenService),
	}
}

type MessageService interface {
	GetAll() ([]models.Message, error)
	GetPart(id int) ([]models.Message, error)
	Create(message models.Message) (int, error)
}

type UserService interface {
	Create(user *models.User) (int, error)
	Login(username, password string) (string, string, error)
}

type TokenService interface {
	GenerateRefreshToken(userID int, userName, userLogin string) (string, error)
	GenerateAccessToken(userID int, userName, userLogin string) (string, error)
	ParseExpireRefreshToken(refreshToken string) (time.Time, error)
	ParseRefreshToken(refreshToken string) (models.ResponseUser, error)
	ParseAccessToken(accessToken string) (models.ResponseUser, error)
	AddTokenToBlacklist(refreshToken string, expiresAt time.Time) error
	TokenInBlackList(refreshToken string) bool
}
