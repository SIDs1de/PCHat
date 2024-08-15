package tokens

import (
	"github.com/dgrijalva/jwt-go"
	"online_chat/pkg/domain/models"
	"time"
)

func (t *TokenService) GenerateAccessToken(userID int, userName, userLogin string) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, &tokenAccessClaims{
		jwt.StandardClaims{
			ExpiresAt: time.Now().Add(accessTokenTTL).Unix(),
			IssuedAt:  time.Now().Unix(),
		},
		models.ResponseUser{
			Id:    userID,
			Name:  userName,
			Login: userLogin,
		},
	})
	return token.SignedString([]byte(signingAccessKey))
}

func (t *TokenService) GenerateRefreshToken(userID int, userName, userLogin string) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, &tokenRefreshClaims{
		jwt.StandardClaims{
			ExpiresAt: time.Now().Add(refreshTokenTTL).Unix(),
			IssuedAt:  time.Now().Unix(),
		},
		models.ResponseUser{
			Id:    userID,
			Name:  userName,
			Login: userLogin,
		},
	})
	return token.SignedString([]byte(signingRefreshKey))
}
