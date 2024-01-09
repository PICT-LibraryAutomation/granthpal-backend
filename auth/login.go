package auth

import (
	"encoding/json"
	"net/http"
	"time"

	"github.com/PICT-LibraryAutomation/granthpal/database/models"
	"github.com/PICT-LibraryAutomation/granthpal/sessions"
	"github.com/PICT-LibraryAutomation/granthpal/utils"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type LoginPayload struct {
	PRN      string `json:"prn"`
	Password string `json:"password"`
}

func Login(w http.ResponseWriter, r *http.Request) {
	var payload LoginPayload
	if err := json.NewDecoder(r.Body).Decode(&payload); err != nil {
		(&utils.ErrorResponse{
			Code:    http.StatusBadRequest,
			Message: "Invalid payload provided",
		}).Write(&w)
		return
	}

	sm := r.Context().Value(utils.SessionsManagerKey).(*sessions.SessionManager)
	db := r.Context().Value(utils.DatabaseKey).(*gorm.DB)

	var user models.User
	if err := db.First(&user, "prn = ?", payload.PRN).Error; err != nil {
		(&utils.ErrorResponse{
			Code:    http.StatusBadRequest,
			Message: "Couldn't find user",
		}).Write(&w)
		return
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(payload.Password)); err != nil {
		(&utils.ErrorResponse{
			Code:    http.StatusUnauthorized,
			Message: "Incorrect Password",
		}).Write(&w)
	}

	expiry := time.Now().Add(SESSION_LENGTH)
	session := sessions.Session{
		UserID: user.PRN,
		Expiry: expiry,
	}

	sessionID, err := sm.CreateSession(&session)
	if err != nil {
		(&utils.ErrorResponse{
			Code:    http.StatusInternalServerError,
			Message: "Could not create a session",
		}).Write(&w)
	}

	http.SetCookie(w, &http.Cookie{
		Name:     AUTH_SESSION_COOKIE,
		Value:    sessionID,
		Path:     "/",
		HttpOnly: true,
		Expires:  expiry,
	})

	w.WriteHeader(http.StatusOK)
}
