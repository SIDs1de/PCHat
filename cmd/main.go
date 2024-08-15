package main

import (
	"context"
	"github.com/sirupsen/logrus"
	"online_chat/pkg/app"
	"os"
	"os/signal"
	"syscall"
	"time"
)

func main() {
	a, err := app.NewApp()
	if err != nil {
		logrus.Fatal(err)
	}

	go a.MustRun()

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit
	logrus.Info("Shutdown Server ...")

	ctx, cancel := context.WithTimeout(context.Background(), 1*time.Second)
	defer cancel()
	a.Shutdown(ctx)

	select {
	case <-ctx.Done():
		logrus.Info("timeout of 5 seconds.")
	}
	logrus.Info("Server exiting")
}
