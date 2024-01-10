package auth

import (
	"net/http"

	"github.com/PICT-LibraryAutomation/granthpal/sessions"
	"github.com/PICT-LibraryAutomation/granthpal/utils"
)

func Logout(w http.ResponseWriter, r *http.Request) {
	auth := r.Context().Value(utils.AuthKey).(AuthState)
	sm := r.Context().Value(utils.SessionsManagerKey).(*sessions.SessionManager)
	cookie, err := r.Cookie(sessions.AUTH_SESSION_COOKIE)
	if err != nil || !auth.IsAuth {
		http.Error(w, "User not logged in", http.StatusUnauthorized)
	}

	sm.DeleteSession(cookie.Value)
	http.SetCookie(w, &http.Cookie{
		Name:     sessions.AUTH_SESSION_COOKIE,
		Value:    "",
		HttpOnly: true,
		MaxAge:   -1,
	})

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Done"))
}
