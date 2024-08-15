package user

import (
	"online_chat/pkg/repository"
	"online_chat/pkg/service/tokens"
)

type UserService struct {
	userRepository repository.UserRepository
	tokenProvider  *tokens.TokenService
}

func NewUserService(userRepository repository.UserRepository, tokenProvider *tokens.TokenService) *UserService {
	return &UserService{userRepository: userRepository, tokenProvider: tokenProvider}
}
