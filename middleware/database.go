package middleware

import (
	"context"
	"net/http"

	"github.com/PICT-LibraryAutomation/granthpal/database"
	"github.com/PICT-LibraryAutomation/granthpal/utils"
)

func DatabaseMiddleware(db *database.Database) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			ctx := context.WithValue(r.Context(), utils.DatabaseCtxKey, db)
			r = r.WithContext(ctx)
			next.ServeHTTP(w, r)
		})
	}
}
