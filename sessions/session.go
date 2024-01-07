package sessions

import (
	"encoding/json"
	"time"
)

type sessionJSON struct {
	ID     string `json:"id"`
	UserID string `json:"user_id"`
	Expiry int64  `json:"expiry"`
}

type Session struct {
	ID     string
	UserID string
	Expiry time.Time
}

func (s *Session) ToJSON() ([]byte, error) {
	data, err := json.Marshal(sessionJSON{
		ID:     s.ID,
		UserID: s.UserID,
		Expiry: s.Expiry.UTC().UnixMilli(),
	})

	if err != nil {
		return nil, err
	}

	return data, nil
}

func SessionFromJSON(data []byte) (*Session, error) {
	var session sessionJSON
	if err := json.Unmarshal(data, &session); err != nil {
		return nil, err
	}

	expiry := time.UnixMilli(session.Expiry)

	return &Session{
		ID:     session.ID,
		UserID: session.UserID,
		Expiry: expiry,
	}, nil
}
