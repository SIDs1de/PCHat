package user

import (
	"online_chat/pkg/reposiroty"
)

type UserService struct {
	userRepository reposiroty.UserRepository
}

func NewUserService(userRepository reposiroty.UserRepository) *UserService {
	return &UserService{userRepository: userRepository}
}
