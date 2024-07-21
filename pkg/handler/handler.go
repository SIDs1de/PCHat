package handler

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
	"online_chat/pkg/handler/auth"
	"online_chat/pkg/handler/middleware"
	"online_chat/pkg/handler/socketHandler"
	"online_chat/pkg/service"
	"time"
)

type Handler struct {
	Service       *service.Service
	socketHandler *socketHandler.SocketHandler
	middleWare    *middleware.Middleware
	authorization *auth.Authorization
}

func NewHandler(service *service.Service) *Handler {
	handler := &Handler{Service: service}
	handler.socketHandler = socketHandler.NewSocketHandler(map[*websocket.Conn]bool{}, handler.Service)
	handler.middleWare = middleware.NewMiddleware(handler.Service)
	handler.authorization = auth.NewAuthorization(handler.Service)
	return handler
}

func (h *Handler) InitRoutes() *gin.Engine {
	//gin.SetMode(gin.ReleaseMode)
	router := gin.New()
	h.initCORS(router)

	router.GET("/", h.handleConnections)
	router.POST("/sign-up", h.authorization.SignUp)
	router.POST("/sign-in", h.authorization.SignIn)
	router.POST("/logout", h.authorization.LogOut)

	api := router.Group("/api")
	{
		api.POST("/refresh", h.authorization.RefreshAccessToken)
		api.Use(h.middleWare.UserIdentity)
		api.GET("/test", h.authorization.Test)
	}

	//h.Service.UserService.ParseRefreshToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MjIxMTgxNzYsImlhdCI6MTcyMTUxMzM3NiwidXNlcl9JRCI6Mn0.2NkNKvjenLgmR5XWXAvyOmKObAPxgDBzw9pyD6mNza8")
	return router
}

func (h *Handler) initCORS(router *gin.Engine) {
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))
}
