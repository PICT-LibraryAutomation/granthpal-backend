package sessions

import (
	"context"
	"os"
	"strconv"

	"github.com/google/uuid"
	"github.com/redis/go-redis/v9"
	"go.uber.org/zap"
)

type SessionManager struct {
	client *redis.Client
}

func (sm *SessionManager) CreateSession(session Session) (string, error) {
	if session.ID == "" {
		session.ID = uuid.NewString()
	}

	data, err := session.ToJSON()
	if err != nil {
		return "", err
	}

	return session.ID, sm.client.Set(context.Background(), session.ID, data, 0).Err()
}

func (sm *SessionManager) GetSession(id string) (*Session, error) {
	data, err := sm.client.Get(context.Background(), id).Bytes()
	if err != nil {
		return nil, err
	}

	return SessionFromJSON(data)
}

func (sm *SessionManager) DeleteSession(id string) error {
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

	client := redis.NewClient(&redis.Options{
		Addr:     addr,
		Password: pass,
		DB:       db,
	})

	logger.Infof("Connected to Redis")
	return &SessionManager{client: client}
}
