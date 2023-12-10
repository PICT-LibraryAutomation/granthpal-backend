package models

import (
	"context"
	"time"

	"github.com/PICT-LibraryAutomation/granthpal/database"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type IssueInfoModel struct {
	ID         primitive.ObjectID `bson:"_id"`
	BookID     string             `bson:"bookID"`
	IssuedByID string             `bson:"issuedByID"`
	IssueDate  time.Time          `bson:"issueDate"`
	ReturnDate time.Time          `bson:"returnDate"`
	Complete   bool               `bson:"complete"`
	Payment    int                `bson:"payment"`
}

func GetIssueInfos(ctx context.Context, db *database.Database, filter interface{}) ([]*IssueInfoModel, error) {
	var issueInfos []*IssueInfoModel
	curr, err := db.Collection("issueInfos").Find(ctx, filter)

	if err != nil {
		return nil, err
	}
	if err := curr.All(ctx, &issueInfos); err != nil {
		return nil, err
	}

	return issueInfos, nil
}

func GetIssueInfo(ctx context.Context, db *database.Database, filter interface{}) (*IssueInfoModel, error) {
	var issueInfo *IssueInfoModel
	err := db.Collection("issueInfos").FindOne(ctx, filter).Decode(&issueInfo)
	if err != nil {
		return nil, err
	}

	return issueInfo, nil
}
