package message

import (
	"online_chat/pkg/model"
)

func (s *MessageService) GetAll() ([]model.Message, error) {
	return s.messageRepository.GetAll()
}

func (s *MessageService) GetPart(id int) ([]model.Message, error) {
	return s.messageRepository.GetPart(id)
}
