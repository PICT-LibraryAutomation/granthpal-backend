package models

import "github.com/PICT-LibraryAutomation/granthpal/graph"

type Publisher struct {
	ID   string `gorm:"primaryKey"`
	Name string
}

func (t *Publisher) ToGraphModel() *graph.Publisher {
	return &graph.Publisher{
		ID:   t.ID,
		Name: t.Name,
	}
}
