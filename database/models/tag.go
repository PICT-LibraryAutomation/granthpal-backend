package models

import "github.com/PICT-LibraryAutomation/granthpal/graph"

type Tag struct {
	ID        string `gorm:"primaryKey"`
	Name      string
	BookMetas []BookMetadata `gorm:"many2many:tag_book_metas"`
}

func (t *Tag) ToGraphModel() *graph.Tag {
	return &graph.Tag{
		ID:   t.ID,
		Name: t.Name,
	}
}
