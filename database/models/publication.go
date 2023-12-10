package models

import (
	"context"

	"github.com/PICT-LibraryAutomation/granthpal/database"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type PublicationModel struct {
	ID   primitive.ObjectID `bson:"_id"`
	Name string             `bson:"name"`
}

func GetPublications(ctx context.Context, db *database.Database, filter interface{}) ([]*PublicationModel, error) {
	var publications []*PublicationModel
	curr, err := db.Collection("publications").Find(ctx, filter)

	if err != nil {
		return nil, err
	}
	if err := curr.All(ctx, &publications); err != nil {
		return nil, err
	}

	return publications, nil
}

func GetPublication(ctx context.Context, db *database.Database, filter interface{}) (*PublicationModel, error) {
	var publication *PublicationModel
	err := db.Collection("publications").FindOne(ctx, filter).Decode(&publication)
	if err != nil {
		return nil, err
	}

	return publication, nil
}
