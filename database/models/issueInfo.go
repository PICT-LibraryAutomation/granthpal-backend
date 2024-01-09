package models

import (
	"time"

	"github.com/PICT-LibraryAutomation/granthpal/graph"
)

type IssueInfo struct {
	ID         string `gorm:"primaryKey"`
	Status     graph.IssueStatus
	BookID     string
	IssuedByID string
	IssueDate  time.Time
	ReturnDate time.Time
}

func (t *IssueInfo) ToGraphModel() *graph.IssueInfo {
	return &graph.IssueInfo{
		ID:         t.ID,
		Status:     t.Status,
		BookID:     t.BookID,
		IssuedByID: t.IssuedByID,
		IssueDate:  t.IssueDate,
		ReturnDate: t.ReturnDate,
	}
}
