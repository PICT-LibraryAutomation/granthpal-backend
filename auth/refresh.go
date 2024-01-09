package auth

import (
	"net/http"
	"time"

	"github.com/PICT-LibraryAutomation/granthpal/sessions"
)

func RefreshSession(
	sm *sessions.SessionManager,
	session *sessions.Session,
	w http.ResponseWriter,
	r *http.Request,
) (*sessions.Session, error) {
	expiry := time.Now().Add(SESSION_LENGTH)
	newSession := sessions.Session{
		UserID: session.UserID,
		Expiry: expiry,
	}

	sessionID, err := sm.CreateSession(&newSession)
	if err != nil {
		return nil, err
	}

	sm.DeleteSession(session.ID)

	http.SetCookie(w, &http.Cookie{
		Name:     AUTH_SESSION_COOKIE,
		Value:    sessionID,
		Path:     "/",
		HttpOnly: true,
		Expires:  expiry,
	})

	return &newSession, nil
}
