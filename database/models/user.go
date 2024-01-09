package models

import (
	"github.com/PICT-LibraryAutomation/granthpal/graph"
)

type User struct {
	PRN          string `gorm:"primaryKey"`
	Kind         graph.UserKind
	Name         string
	PasswordHash string
	PendingFine  int
}

func (t *User) ToGraphModel() *graph.User {
	return &graph.User{
		Prn:         t.PRN,
		Kind:        t.Kind,
		Name:        t.Name,
		PendingFine: t.PendingFine,
	}
}
