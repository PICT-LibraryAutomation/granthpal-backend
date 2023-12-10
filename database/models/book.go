package models

import (
	"context"

	"github.com/PICT-LibraryAutomation/granthpal/database"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type BookModel struct {
	ID     primitive.ObjectID `bson:"_id"`
	MetaID string             `bson:"metaID"`
}

func GetBooks(ctx context.Context, db *database.Database, filter interface{}) ([]*BookModel, error) {
	var books []*BookModel
	curr, err := db.Collection("books").Find(ctx, filter)

	if err != nil {
		return nil, err
	}
	if err := curr.All(ctx, &books); err != nil {
		return nil, err
	}

	return books, nil
}

func GetBook(ctx context.Context, db *database.Database, filter interface{}) (*BookModel, error) {
	var book *BookModel
	err := db.Collection("books").FindOne(ctx, filter).Decode(&book)
	if err != nil {
		return nil, err
	}

	return book, nil
}
