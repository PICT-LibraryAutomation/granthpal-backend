package resolvers

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.
// Code generated by github.com/99designs/gqlgen version v0.17.42

import (
	"context"

	"github.com/PICT-LibraryAutomation/granthpal/database/models"
	"github.com/PICT-LibraryAutomation/granthpal/graph"
	"github.com/PICT-LibraryAutomation/granthpal/utils"
)

// Book is the resolver for the book field.
func (r *issueInfoResolver) Book(ctx context.Context, obj *graph.IssueInfo) (*graph.Book, error) {
	var book models.Book
	if err := r.DB.First(&book, "id = ?", obj.BookID).Error; err != nil {
		return nil, err
	}

	return book.ToGraphModel(), nil
}

// IssuedBy is the resolver for the issuedBy field.
func (r *issueInfoResolver) IssuedBy(ctx context.Context, obj *graph.IssueInfo) (*graph.User, error) {
	var issuedBy models.User
	if err := r.DB.First(&issuedBy, "id = ?", obj.IssuedByID).Error; err != nil {
		return nil, err
	}

	return issuedBy.ToGraphModel(), nil
}

// IssueInfo is the resolver for the issueInfo field.
func (r *queryResolver) IssueInfo(ctx context.Context, id string) (*graph.IssueInfo, error) {
	var issueInfo models.IssueInfo
	if err := r.DB.First(&issueInfo, "id = ?", id).Error; err != nil {
		return nil, err
	}

	return issueInfo.ToGraphModel(), nil
}

// IssueInfos is the resolver for the issueInfos field.
func (r *queryResolver) IssueInfos(ctx context.Context) ([]*graph.IssueInfo, error) {
	var issueInfos []models.IssueInfo
	if err := r.DB.Find(&issueInfos).Error; err != nil {
		return nil, err
	}

	return utils.Map(issueInfos, func(info models.IssueInfo) *graph.IssueInfo {
		return info.ToGraphModel()
	}), nil
}

// IssueInfo returns graph.IssueInfoResolver implementation.
func (r *Resolver) IssueInfo() graph.IssueInfoResolver { return &issueInfoResolver{r} }

type issueInfoResolver struct{ *Resolver }
