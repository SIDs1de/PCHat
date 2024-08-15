package app

import (
	"context"
	"errors"
	"github.com/jmoiron/sqlx"
	"github.com/sirupsen/logrus"
	"net/http"
	"online_chat/pkg/config"
	"online_chat/pkg/handler"
	"online_chat/pkg/repository"
	"online_chat/pkg/repository/sql"
	"online_chat/pkg/service"
	"time"
)

type App struct {
	httpServer *http.Server
	config     *config.Config
	handler    *handler.Handler
	db         *sqlx.DB
}

func NewApp() (*App, error) {
	a := &App{}
	if err := a.initDeps(); err != nil {
		return nil, err
	}
	return a, nil
}

func (a *App) initDeps() error {

	inits := []func() error{
		a.initConfig,
		func() error { return a.initDB(a.config.DB.DBMS) },
		a.initHandler,
	}

	for _, f := range inits {
		err := f()
		if err != nil {
			return err
		}
	}

	return nil
}

func (a *App) initConfig() error {
	cfg, err := config.InitConfig()
	if err != nil {
		logrus.Fatal(err)
	}

	a.config = cfg

	return nil
}

func (a *App) initDB(dbms string) error {
	switch dbms {
	case "postgres":
		db, err := sql.NewPostgresDB(&sql.DBConfig{
			Host:     a.config.DB.Postgres.Host,
			Port:     a.config.DB.Postgres.Port,
			Username: a.config.DB.Postgres.Username,
			Password: a.config.DB.Postgres.Password,
			DBName:   a.config.DB.Postgres.DBName,
			SSLMode:  a.config.DB.Postgres.SSLMode,
		})
		if err != nil {
			logrus.Fatal(err)
		}
		a.db = db
	case "sqlite3":
		db, err := sql.NewSQLiteDB(a.config.DB.StoragePath)
		if err != nil {
			logrus.Fatal(err)
		}
		a.db = db
	}

	if a.db == nil {
		return errors.New("the database is equal to nil")
	}

	return nil
}

func (a *App) initHandler() error {
	repo := repository.NewRepository(a.db)
	serve := service.NewService(repo)
	a.handler = handler.NewHandler(serve)

	return nil
}

func (a *App) MustRun() {
	if err := a.runServer(); err != nil && !errors.Is(err, http.ErrServerClosed) {
		panic(err)
	}
}

func (a *App) runServer() error {
	a.httpServer = &http.Server{
		Addr:           a.config.Host + ":" + a.config.Port,
		MaxHeaderBytes: 1 << 20, // 1 mb
		ReadTimeout:    10 * time.Second,
		WriteTimeout:   10 * time.Second,
		Handler:        a.handler.InitRoutes(),
	}

	return a.httpServer.ListenAndServe()
}

func (a *App) Shutdown(ctx context.Context) {
	_ = a.db.Close()
	if err := a.httpServer.Shutdown(ctx); err != nil {
		panic(err)
	}
}
