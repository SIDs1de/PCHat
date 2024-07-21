package user

import (
	"crypto/sha1"
	"fmt"
	"online_chat/pkg/model"
)

const (
	salt = "dshjsjhkf387879sdif28j9"
)

func (s *UserService) Create(user *model.User) (int, error) {
	user.Password = GeneratePasswordHash(user.Password)
	return s.userRepository.Create(user)
}

func GeneratePasswordHash(password string) string {
	hash := sha1.New()
	hash.Write([]byte(password))

	return fmt.Sprintf("%x", hash.Sum([]byte(salt)))
}
