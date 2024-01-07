package models

import "github.com/PICT-LibraryAutomation/granthpal/graph"

type User struct {
	PRN       string `gorm:"primaryKey"`
	Kind      graph.UserKind
	Name      string
	AllIssued []IssueInfo `gorm:"foreignKey:IssuedByID"`
}
