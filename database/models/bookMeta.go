package models

import (
	"github.com/PICT-LibraryAutomation/granthpal/graph"
)

type BookMetadata struct {
	ID          string `gorm:"primaryKey"`
	Name        string
	Abstract    string
	ISBN        string
	PublisherID string
	Authors     []Author `gorm:"many2many:book_authors"`
	Tags        []Tag    `gorm:"many2many:tag_book_metas"`
}

func (t *BookMetadata) ToGraphModel() *graph.BookMetadata {
	return &graph.BookMetadata{
		ID:          t.ID,
		Name:        t.Name,
		Abstract:    t.Abstract,
		Isbn:        t.ISBN,
		PublisherID: t.PublisherID,
	}
}
