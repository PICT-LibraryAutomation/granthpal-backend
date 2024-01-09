package auth

import (
	"time"

	"github.com/PICT-LibraryAutomation/granthpal/sessions"
)

const AUTH_SESSION_COOKIE = "auth-session"

type AuthState struct {
	IsAuth    bool
	SessionID string
	Session   *sessions.Session
}

var SESSION_LENGTH = time.Hour
