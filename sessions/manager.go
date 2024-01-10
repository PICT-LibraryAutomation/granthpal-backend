package sessions

import (
	"context"
	"net/http"
	"os"
	"strconv"
	"time"

	"github.com/google/uuid"
	"github.com/gorilla/securecookie"
	"github.com/redis/go-redis/v9"
	"go.uber.org/zap"
)

type SessionManager struct {
	client  *redis.Client
	cookies securecookie.SecureCookie
}

func (sm *SessionManager) CreateSession(userID string) (*Session, *http.Cookie, error) {
	sessionID := uuid.NewString()
	expiry := time.Now().Add(SESSION_LENTH)

	encodedSessionID, err := sm.cookies.Encode(AUTH_SESSION_COOKIE, sessionID)
	if err != nil {
		return nil, nil, err
	}

	cookie := http.Cookie{
		Name:     AUTH_SESSION_COOKIE,
		Value:    encodedSessionID,
		Path:     "/",
		HttpOnly: true,
		MaxAge:   int(SESSION_LENTH.Seconds()),
		Expires:  expiry,
	}

	session := Session{
		ID:     sessionID,
		UserID: userID,
		Expiry: expiry,
	}

	data, err := session.ToJSON()
	if err != nil {
		return nil, nil, err
	}

	if err := sm.client.Set(context.Background(), session.ID, data, SESSION_LENTH).Err(); err != nil {
		return nil, nil, err
	}

	return &session, &cookie, nil
}

func (sm *SessionManager) GetSession(encodedID string) (*Session, error) {
	var id string
	if err := sm.cookies.Decode(AUTH_SESSION_COOKIE, encodedID, &id); err != nil {
		return nil, err
	}

	data, err := sm.client.Get(context.Background(), id).Bytes()
	if err != nil {
		return nil, err
	}

	return SessionFromJSON(data)
}

func (sm *SessionManager) DeleteSession(encodedID string) error {
	var id string
	if err := sm.cookies.Decode(AUTH_SESSION_COOKIE, encodedID, &id); err != nil {
		return err
	}

	return sm.client.Del(context.Background(), id).Err()
}

func NewSessionManager(logger *zap.SugaredLogger) *SessionManager {
	addr := os.Getenv("GRANTHPAL_REDIS_ADDR")
	if addr == "" {
		logger.Fatalf("Redis Address not provided")
	}

	pass := os.Getenv("GRANTHPAL_REDIS_PASS")

	dbStr := os.Getenv("GRANTHPAL_REDIS_DB")
	if dbStr == "" {
		logger.Fatalf("Redis DB not provided")
	}
	db, err := strconv.Atoi(dbStr)
	if err != nil {
		logger.Fatalf("Invalid Redis DB provided")
	}

	secureKey := os.Getenv("GRANTHPAL_SECURE_KEY")
	if secureKey == "" {
		logger.Fatalf("Secure Key not provided for Cookie encryption")
	}

	client := redis.NewClient(&redis.Options{
		Addr:     addr,
		Password: pass,
		DB:       db,
	})

	logger.Infof("Connected to Redis")
	return &SessionManager{
		client:  client,
		cookies: *securecookie.New([]byte(secureKey), nil),
	}
}
