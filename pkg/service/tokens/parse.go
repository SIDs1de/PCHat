package tokens

import (
	"errors"
	"github.com/dgrijalva/jwt-go"
	"online_chat/pkg/domain/models"
	"time"
)

func (t *TokenService) ParseRefreshToken(refreshToken string) (models.ResponseUser, error) {
	token, err := jwt.ParseWithClaims(refreshToken, &tokenRefreshClaims{}, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, errors.New("invalid signing method")
		}

		return []byte(signingRefreshKey), nil
	})
	if err != nil {
		return models.ResponseUser{}, err
	}

	claims, ok := token.Claims.(*tokenRefreshClaims)
	if !ok {
		return models.ResponseUser{}, errors.New("tokens claims are not of type *tokenClaims")
	}

	return claims.User, nil
}

func (t *TokenService) ParseExpireRefreshToken(refreshToken string) (time.Time, error) {
	token, err := jwt.ParseWithClaims(refreshToken, &tokenRefreshClaims{}, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, errors.New("invalid signing method")
		}

		return []byte(signingRefreshKey), nil
	})
	if err != nil {
		return time.Time{}, err
	}

	claims, ok := token.Claims.(*tokenRefreshClaims)
	if !ok {
		return time.Time{}, errors.New("tokens claims are not of type *tokenClaims")
	}

	return time.Unix(claims.ExpiresAt, 0), nil
}

func (t *TokenService) ParseAccessToken(accessToken string) (models.ResponseUser, error) {
	token, err := jwt.ParseWithClaims(accessToken, &tokenAccessClaims{}, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, errors.New("invalid signing method")
		}

		return []byte(signingAccessKey), nil
	})
	if err != nil {
		return models.ResponseUser{}, err
	}

	claims, ok := token.Claims.(*tokenAccessClaims)
	if !ok {
		return models.ResponseUser{}, errors.New("tokens claims are not of type *tokenClaims")
	}

	return claims.User, nil
}

func (t *TokenService) TokenInBlackList(refreshToken string) bool {
	return t.userRepository.TokenInBlackList(refreshToken)
}
