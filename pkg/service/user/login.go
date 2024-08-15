package user

import (
	"errors"
)

func (u *UserService) Login(username, password string) (string, string, error) {
	user, err := u.userRepository.Get(username, GeneratePasswordHash(password))
	if err != nil {
		return "", "", errors.New("invalid credentials")
	}

	accessToken, err := u.tokenProvider.GenerateAccessToken(user.Id, user.Name, user.Login)
	if err != nil {
		return "", "", errors.New("failed to generate access token")
	}
	refreshToken, err := u.tokenProvider.GenerateRefreshToken(user.Id, user.Name, user.Login)
	if err != nil {
		return "", "", errors.New("failed to generate refresh token")
	}

	return refreshToken, accessToken, nil
}
