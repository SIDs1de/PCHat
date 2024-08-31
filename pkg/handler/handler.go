package handler

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
	"online_chat/pkg/handler/auth"
	"online_chat/pkg/handler/middleware"
	"online_chat/pkg/handler/socketHandler"
	"online_chat/pkg/handler/user"
	"online_chat/pkg/service"
	"time"
)

type Handler struct {
	Service              *service.Service
	socketHandler        *socketHandler.SocketHandler
	authorizationHandler *auth.Authorization
	userHandler          *user.UserHandler
	middleware           *middleware.Middleware
}

func NewHandler(service *service.Service) *Handler {
	handler := &Handler{Service: service}
	handler.socketHandler = socketHandler.NewSocketHandler(map[*websocket.Conn]bool{}, handler.Service)
	handler.authorizationHandler = auth.NewAuthorization(handler.Service)
	handler.userHandler = user.NewUserHandler(handler.Service)
	handler.middleware = middleware.NewMiddleware(handler.Service)
	return handler
}

func (h *Handler) InitRoutes() *gin.Engine {
	//gin.SetMode(gin.ReleaseMode)
	router := gin.New()
	h.initCORS(router)

	router.GET("/", h.handleConnections)
	router.POST("/sign-up", h.authorizationHandler.SignUp)
	router.POST("/sign-in", h.authorizationHandler.SignIn)
	router.POST("/logout", h.authorizationHandler.LogOut)

	api := router.Group("/api")
	{
		api.POST("/refresh", h.authorizationHandler.RefreshAccessToken)

		api.Use(h.middleware.VerifyAccessToken)
		api.GET("/validate", h.userHandler.IdentificationUser)
		api.GET("/test", h.authorizationHandler.Test)
	}

	return router
}

func (h *Handler) initCORS(router *gin.Engine) {
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization, Dnt, Referer, User-Agent"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))
}
