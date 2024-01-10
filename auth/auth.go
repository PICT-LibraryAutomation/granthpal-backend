package auth

import "github.com/PICT-LibraryAutomation/granthpal/sessions"

type AuthState struct {
	IsAuth  bool
	Session *sessions.Session
}
