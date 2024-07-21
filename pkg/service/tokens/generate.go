package tokens

import (
	"errors"
	"github.com/dgrijalva/jwt-go"
	userService "online_chat/pkg/service/user"
	"time"
)

func (t *TokenService) GenerateTokens(username, password string) (string, string, error) {
	user, err := t.userRepository.Get(username, userService.GeneratePasswordHash(password))
	if err != nil {
		return "", "", errors.New("incorrect data is specified")
	}

	accessToken, err := t.GenerateAccessToken(user.Id)
	if err != nil {
		return "", "", err
	}
	refreshToken, err := t.GenerateRefreshToken(user.Id)
	if err != nil {
		return "", "", err
	}

	return refreshToken, accessToken, nil
}

func (t *TokenService) GenerateAccessToken(userID int) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, &tokenClaims{
		jwt.StandardClaims{
			ExpiresAt: time.Now().Add(accessTokenTTL).Unix(),
			IssuedAt:  time.Now().Unix(),
		},
		userID,
	})
	return token.SignedString([]byte(signingAccessKey))
}

func (t *TokenService) GenerateRefreshToken(id int) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, &tokenClaims{
		jwt.StandardClaims{
			ExpiresAt: time.Now().Add(refreshTokenTTL).Unix(),
			IssuedAt:  time.Now().Unix(),
		},
		id,
	})
	return token.SignedString([]byte(signingRefreshKey))
}
