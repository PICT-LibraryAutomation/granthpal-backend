package auth

import (
	"context"
	"net/http"
	"time"

	"github.com/PICT-LibraryAutomation/granthpal/database/models"
	"github.com/PICT-LibraryAutomation/granthpal/sessions"
	"github.com/PICT-LibraryAutomation/granthpal/utils"
	"gorm.io/gorm"
)

func AuthMiddleware() func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			sm := r.Context().Value(utils.SessionsManagerKey).(*sessions.SessionManager)
			db := r.Context().Value(utils.DatabaseKey).(*gorm.DB)

			cookie, err := r.Cookie(sessions.AUTH_SESSION_COOKIE)
			if err != nil {
				ctx := context.WithValue(r.Context(), utils.AuthKey, AuthState{IsAuth: false})
				r = r.WithContext(ctx)
				next.ServeHTTP(w, r)
				return
			}

			session, err := sm.GetSession(cookie.Value)
			if err != nil {
				ctx := context.WithValue(r.Context(), utils.AuthKey, AuthState{IsAuth: false})
				r = r.WithContext(ctx)
				next.ServeHTTP(w, r)
				return
			}

			if time.Now().After(session.Expiry) {
				http.SetCookie(w, &http.Cookie{
					Name:     sessions.AUTH_SESSION_COOKIE,
					Value:    "",
					HttpOnly: true,
					MaxAge:   -1,
				})
				ctx := context.WithValue(r.Context(), utils.AuthKey, AuthState{IsAuth: false})
				r = r.WithContext(ctx)
				next.ServeHTTP(w, r)
				return
			}

			var user models.User
			if err := db.First(&user, "prn = ?", session.UserID); err != nil {
				sm.DeleteSession(cookie.Value)
				http.SetCookie(w, &http.Cookie{
					Name:     sessions.AUTH_SESSION_COOKIE,
					Value:    "",
					HttpOnly: true,
					MaxAge:   -1,
				})
				ctx := context.WithValue(r.Context(), utils.AuthKey, AuthState{IsAuth: false})
				r = r.WithContext(ctx)
				next.ServeHTTP(w, r)
				return
			}

			ctx := context.WithValue(r.Context(), utils.AuthKey, AuthState{
				IsAuth:  true,
				Session: session,
			})
			r = r.WithContext(ctx)
			next.ServeHTTP(w, r)
		})
	}
}
