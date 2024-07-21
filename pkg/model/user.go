package model

type User struct {
	Id            int    `json:"id" db:"id"`
	Name          string `json:"name" db:"name" binding:"required"`
	Username      string `json:"username" db:"username" binding:"required"`
	Password      string `json:"password" db:"password_hash" binding:"required"`
	LikesCount    int    `json:"likes_count" db:"likes_count"`
	DislikesCount int    `json:"dislikes_count" db:"dislikes_count"`
}
