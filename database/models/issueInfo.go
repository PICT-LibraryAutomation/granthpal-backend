package models

import (
	"time"

	"github.com/PICT-LibraryAutomation/granthpal/graph"
)

type IssueInfo struct {
	ID          string `gorm:"primaryKey"`
	Status      graph.IssueStatus
	BookID      string
	IssuedByID  string
	IssueDate   time.Time
	ReturnDate  time.Time
	FinePayment int
}
