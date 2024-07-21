package tokens

import (
	"github.com/dgrijalva/jwt-go"
	"online_chat/pkg/reposiroty"
	"time"
)

const (
	accessTokenTTL    = 15 * time.Minute
	refreshTokenTTL   = 7 * 24 * time.Hour
	signingAccessKey  = "AmT*b96A*9%o1#2qKqObeJ7mLei%V)"
	signingRefreshKey = "SxzD5iwMNDI3CVQ8#jzT5UlHLw?BWc"
)

type TokenService struct {
	userRepository reposiroty.UserRepository
}

func NewTokenService(userRepository reposiroty.UserRepository) *TokenService {
	return &TokenService{userRepository: userRepository}
}

type tokenClaims struct {
	jwt.StandardClaims
	UserID int `json:"user_ID"`
}

func (t *TokenService) AddTokenToBlacklist(refreshToken string, expiresAt time.Time) error {
	return t.userRepository.AddTokenToBlacklist(refreshToken, expiresAt)
}
