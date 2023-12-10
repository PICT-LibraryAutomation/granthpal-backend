package models

import (
	"context"

	"github.com/PICT-LibraryAutomation/granthpal/database"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type BookMetadataModel struct {
	ID            primitive.ObjectID `bson:"_id"`
	Name          string             `bson:"name"`
	Abstract      string             `bson:"abstract"`
	AuthorIDs     []string           `bson:"authorIDs"`
	PublicationID string             `bson:"publicationID"`
}

func GetBookMetas(ctx context.Context, db *database.Database, filter interface{}) ([]*BookMetadataModel, error) {
	var bookMetas []*BookMetadataModel
	curr, err := db.Collection("bookMetas").Find(ctx, filter)

	if err != nil {
		return nil, err
	}
	if err := curr.All(ctx, &bookMetas); err != nil {
		return nil, err
	}

	return bookMetas, nil
}

func GetBookMeta(ctx context.Context, db *database.Database, filter interface{}) (*BookMetadataModel, error) {
	var bookMeta *BookMetadataModel
	err := db.Collection("bookMetas").FindOne(ctx, filter).Decode(&bookMeta)
	if err != nil {
		return nil, err
	}

	return bookMeta, nil
}
