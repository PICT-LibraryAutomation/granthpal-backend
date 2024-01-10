package auth

import (
	"encoding/json"
	"net/http"

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
		http.Error(w, "Invalid payload", http.StatusBadRequest)
		return
	}

	sm := r.Context().Value(utils.SessionsManagerKey).(*sessions.SessionManager)
	db := r.Context().Value(utils.DatabaseKey).(*gorm.DB)

	var user models.User
	if err := db.First(&user, "prn = ?", payload.PRN).Error; err != nil {
		http.Error(w, "Cannot find user", http.StatusBadRequest)
		return
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(payload.Password)); err != nil {
		http.Error(w, "Incorrect password provided", http.StatusBadRequest)
		return
	}

	_, cookie, err := sm.CreateSession(user.PRN)
	if err != nil {
		http.Error(w, "Could not login", http.StatusInternalServerError)
		return
	}

	http.SetCookie(w, cookie)
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Done"))
}
