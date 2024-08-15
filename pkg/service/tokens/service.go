package tokens

import (
	"github.com/dgrijalva/jwt-go"
	"online_chat/pkg/domain/models"
	"online_chat/pkg/repository"
	"time"
)

const (
	accessTokenTTL    = 15 * time.Minute
	refreshTokenTTL   = 7 * 24 * time.Hour
	signingAccessKey  = "AmT*b96A*9%o1#2qKqObeJ7mLei%V)"
	signingRefreshKey = "SxzD5iwMNDI3CVQ8#jzT5UlHLw?BWc"
)

type TokenService struct {
	userRepository repository.UserRepository
}

func NewTokenService(userRepository repository.UserRepository) *TokenService {
	return &TokenService{userRepository: userRepository}
}

type tokenAccessClaims struct {
	jwt.StandardClaims
	User models.ResponseUser `json:"user"`
}

type tokenRefreshClaims struct {
	jwt.StandardClaims
	User models.ResponseUser `json:"user"`
}

func (t *TokenService) AddTokenToBlacklist(refreshToken string, expiresAt time.Time) error {
	return t.userRepository.AddTokenToBlacklist(refreshToken, expiresAt)
}
