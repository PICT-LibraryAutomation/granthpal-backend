package graph

import "github.com/PICT-LibraryAutomation/granthpal/database"

//go:generate go run github.com/99designs/gqlgen generate

type Resolver struct {
	db *database.Database
}

func NewResolver(db *database.Database) *Resolver {
	return &Resolver{
		db: db,
	}
}
