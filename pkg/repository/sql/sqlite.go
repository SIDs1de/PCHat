package sql

import (
	_ "github.com/glebarez/sqlite"
	"github.com/jmoiron/sqlx"
)

func NewSQLiteDB(sqlitePath string) (*sqlx.DB, error) {
	db, err := sqlx.Open("sqlite", sqlitePath)
	if err != nil {
		return nil, err
	}

	if err = db.Ping(); err != nil {
		return nil, err
	}

	return db, nil
}
