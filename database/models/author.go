package models

import (
	"context"

	"github.com/PICT-LibraryAutomation/granthpal/database"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type AuthorModel struct {
	ID   primitive.ObjectID `bson:"_id"`
	Name string             `bson:"name"`
}

func GetAuthors(ctx context.Context, db *database.Database, filter interface{}) ([]*AuthorModel, error) {
	var authors []*AuthorModel
	curr, err := db.Collection("authors").Find(ctx, filter)

	if err != nil {
		return nil, err
	}
	if err := curr.All(ctx, &authors); err != nil {
		return nil, err
	}

	return authors, nil
}

func GetAuthor(ctx context.Context, db *database.Database, filter interface{}) (*AuthorModel, error) {
	var author *AuthorModel
	err := db.Collection("authors").FindOne(ctx, filter).Decode(&author)
	if err != nil {
		return nil, err
	}

	return author, nil
}
