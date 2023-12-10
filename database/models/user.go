package models

import (
	"context"

	"github.com/PICT-LibraryAutomation/granthpal/database"
	graphModels "github.com/PICT-LibraryAutomation/granthpal/graph/model"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type UserModel struct {
	ID           primitive.ObjectID   `bson:"_id"`
	PasswordHash string               `bson:"passwordHash"`
	Name         string               `bson:"name"`
	Phone        string               `bson:"phone"`
	PRN          string               `bson:"prn"`
	Kind         graphModels.UserKind `bson:"kind"`
}

func GetUsers(ctx context.Context, db *database.Database, filter interface{}) ([]*UserModel, error) {
	var users []*UserModel
	curr, err := db.Collection("users").Find(ctx, filter)

	if err != nil {
		return nil, err
	}
	if err := curr.All(ctx, &users); err != nil {
		return nil, err
	}

	return users, nil
}

func GetUser(ctx context.Context, db *database.Database, filter interface{}) (*UserModel, error) {
	var user *UserModel
	err := db.Collection("users").FindOne(ctx, filter).Decode(&user)
	if err != nil {
		return nil, err
	}

	return user, nil
}
