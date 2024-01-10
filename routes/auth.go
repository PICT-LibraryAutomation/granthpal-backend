package routes

import (
	"github.com/PICT-LibraryAutomation/granthpal/auth"
	"github.com/go-chi/chi/v5"
)

func AuthRouter() *chi.Mux {
	router := chi.NewRouter()
	router.Post("/login", auth.Login)
	router.Post("/logout", auth.Logout)
	return router
}
