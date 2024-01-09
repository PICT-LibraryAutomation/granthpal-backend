package auth

import (
	"context"
	"net/http"
	"time"

	"github.com/PICT-LibraryAutomation/granthpal/sessions"
	"github.com/PICT-LibraryAutomation/granthpal/utils"
)

func AuthMiddleware() func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			sm := r.Context().Value(utils.SessionsManagerKey).(*sessions.SessionManager)
			cookie, err := r.Cookie(AUTH_SESSION_COOKIE)
			if err != nil {
				ctx := context.WithValue(r.Context(), utils.AuthKey, AuthState{IsAuth: false})
				r = r.WithContext(ctx)
				next.ServeHTTP(w, r)
				return
			}

			var session *sessions.Session
			session, err = sm.GetSession(cookie.Value)
			if err != nil {
				ctx := context.WithValue(r.Context(), utils.AuthKey, AuthState{IsAuth: false})
				r = r.WithContext(ctx)
				next.ServeHTTP(w, r)
				return
			}

			if time.Now().After(session.Expiry) {
				session, err = RefreshSession(sm, session, w, r)
				if err != nil {
					ctx := context.WithValue(r.Context(), utils.AuthKey, AuthState{IsAuth: false})
					r = r.WithContext(ctx)
					next.ServeHTTP(w, r)
					return
				}
			}

			ctx := context.WithValue(r.Context(), utils.AuthKey, AuthState{
				IsAuth:    true,
				SessionID: cookie.Value,
				Session:   session,
			})
			r = r.WithContext(ctx)
			next.ServeHTTP(w, r)
		})
	}
}
