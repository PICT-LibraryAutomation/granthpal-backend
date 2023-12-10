package database

import (
	"context"
	"fmt"
	"os"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Database struct {
	client *mongo.Client
}

func (db *Database) Close(ctx context.Context) {
	db.client.Disconnect(ctx)
}

func (db *Database) Collection(name string) *mongo.Collection {
	return db.client.Database("granthpal").Collection(name)
}

func ConnectToDatabase() (*Database, error) {
	mongo_uri := os.Getenv("GRANTHPAL_MONGODB_URI")
	if mongo_uri == "" {
		return nil, fmt.Errorf("MongoDB URI not provided")
	}

	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(mongo_uri))
	if err != nil {
		return nil, err
	}

	return &Database{
		client: client,
	}, nil
}
