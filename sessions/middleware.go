package sessions

import (
	"context"
	"net/http"

	"github.com/PICT-LibraryAutomation/granthpal/utils"
)

func SessionsMiddleware(sessions *SessionManager) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			ctx := context.WithValue(r.Context(), utils.SessionsManagerKey, sessions)
			r = r.WithContext(ctx)
			next.ServeHTTP(w, r)
		})
	}
}
