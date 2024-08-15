package models

type User struct {
	Id            int    `json:"id" db:"id"`
	Name          string `json:"name" db:"name"`
	Login         string `json:"login" db:"login"`
	Password      string `json:"password" db:"password_hash"`
	LikesCount    int    `json:"likes_count" db:"likes_count"`
	DislikesCount int    `json:"dislikes_count" db:"dislikes_count"`
}

type ResponseUser struct {
	Id    int    `json:"id"`
	Name  string `json:"name"`
	Login string `json:"login"`
}
