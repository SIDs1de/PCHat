package sql

import (
	"github.com/jmoiron/sqlx"
	_ "github.com/mattn/go-sqlite3"
)

func NewSQLiteDB(sqlitePath string) (*sqlx.DB, error) {
	db, err := sqlx.Open("sqlite3", sqlitePath)
	if err != nil {
		return nil, err
	}

	if err = db.Ping(); err != nil {
		return nil, err
	}

	return db, nil
}
