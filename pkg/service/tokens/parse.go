package tokens

import (
	"errors"
	"github.com/dgrijalva/jwt-go"
	"time"
)

func (t *TokenService) ParseRefreshToken(refreshToken string) (int, time.Time, error) {
	token, err := jwt.ParseWithClaims(refreshToken, &tokenClaims{}, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, errors.New("invalid signing method")
		}

		return []byte(signingRefreshKey), nil
	})
	if err != nil {
		return 0, time.Time{}, err
	}

	claims, ok := token.Claims.(*tokenClaims)
	if !ok {
		return 0, time.Time{}, errors.New("tokens claims are not of type *tokenClaims")
	}

	return claims.UserID, time.Unix(claims.ExpiresAt, 0), nil
}

func (t *TokenService) ParseAccessToken(accessToken string) (int, error) {
	token, err := jwt.ParseWithClaims(accessToken, &tokenClaims{}, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, errors.New("invalid signing method")
		}

		return []byte(signingAccessKey), nil
	})
	if err != nil {
		return 0, err
	}

	claims, ok := token.Claims.(*tokenClaims)
	if !ok {
		return 0, errors.New("tokens claims are not of type *tokenClaims")
	}

	return claims.UserID, nil
}

func (t *TokenService) TokenInBlackList(refreshToken string) bool {
	return t.userRepository.TokenInBlackList(refreshToken)
}
