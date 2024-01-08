package models

import "github.com/PICT-LibraryAutomation/granthpal/graph"

type Book struct {
	ID     string `gorm:"primaryKey"`
	MetaID string
}

func (t *Book) ToGraphModel() *graph.Book {
	return &graph.Book{
		ID:     t.ID,
		MetaID: t.MetaID,
	}
}
