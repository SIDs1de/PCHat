package app

import (
	"github.com/jmoiron/sqlx"
	"github.com/sirupsen/logrus"
	"net/http"
	"online_chat/pkg/config"
	"online_chat/pkg/handler"
	"online_chat/pkg/reposiroty"
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

func (a *App) Run() error {
	return a.runServer()
}

func (a *App) initDeps() error {
	inits := []func() error{
		a.initConfig,
		a.initDB,
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

//func (a *App) initServiceProvider() error {
//	a.serviceProvider = newServiceProvider()
//	return nil
//}

func (a *App) initConfig() error {
	cfg, err := config.InitConfig()
	if err != nil {
		logrus.Fatal(err)
	}

	a.config = cfg

	return nil
}

func (a *App) initDB() error {
	db, err := NewPostgresDB(&DBConfig{
		Host:     a.config.DB.Host,
		Port:     a.config.DB.Port,
		Username: a.config.DB.Username,
		Password: a.config.DB.Password,
		DBName:   a.config.DB.DBName,
		SSLMode:  a.config.DB.SSLMode,
	})
	if err != nil {
		logrus.Fatal(err)
	}

	a.db = db
	return nil
}

func (a *App) initHandler() error {
	repo := reposiroty.NewRepository(a.db)
	service := service.NewService(repo)
	a.handler = handler.NewHandler(service)

	return nil
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
