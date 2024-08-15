package message

import (
	"online_chat/pkg/domain/models"
)

func (s *MessageService) GetAll() ([]models.Message, error) {
	return s.messageRepository.GetAll()
}

func (s *MessageService) GetPart(id int) ([]models.Message, error) {
	return s.messageRepository.GetPart(id)
}
