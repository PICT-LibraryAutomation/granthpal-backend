package resolvers

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.
// Code generated by github.com/99designs/gqlgen version v0.17.42

import (
	"context"

	"dario.cat/mergo"
	"github.com/PICT-LibraryAutomation/granthpal/database/models"
	"github.com/PICT-LibraryAutomation/granthpal/graph"
	"github.com/PICT-LibraryAutomation/granthpal/utils"
	"github.com/google/uuid"
)

// Authors is the resolver for the authors field.
func (r *bookMetadataResolver) Authors(ctx context.Context, obj *graph.BookMetadata) ([]*graph.Author, error) {
	var authors []models.Author
	err := r.DB.Model(&models.BookMetadata{ID: obj.ID}).Association("Authors").Find(&authors)
	if err != nil {
		return nil, err
	}

	return utils.Map(authors, func(author models.Author) *graph.Author {
		return author.ToGraphModel()
	}), nil
}

// Publisher is the resolver for the publisher field.
func (r *bookMetadataResolver) Publisher(ctx context.Context, obj *graph.BookMetadata) (*graph.Publisher, error) {
	var publisher models.Publisher
	if err := r.DB.First(&publisher, "id = ?", obj.PublisherID).Error; err != nil {
		return nil, err
	}

	return publisher.ToGraphModel(), nil
}

// CreateBookMeta is the resolver for the createBookMeta field.
func (r *mutationResolver) CreateBookMeta(ctx context.Context, inp graph.CreateBookMetaInp) (*graph.BookMetadata, error) {
	bookMeta := models.BookMetadata{
		ID:          uuid.NewString(),
		Name:        inp.Name,
		Abstract:    inp.Abstract,
		ISBN:        inp.Isbn,
		PublisherID: inp.PublisherID,
		Authors: utils.Map(inp.AuthorIDs, func(id string) models.Author {
			return models.Author{ID: id}
		}),
	}
	if err := r.DB.Create(&bookMeta).Error; err != nil {
		return nil, err
	}

	return bookMeta.ToGraphModel(), nil
}

// RemoveBookMeta is the resolver for the removeBookMeta field.
func (r *mutationResolver) RemoveBookMeta(ctx context.Context, id string) (*string, error) {
	if err := r.DB.Delete(&models.BookMetadata{ID: id}).Error; err != nil {
		return nil, err
	}
	return &id, nil
}

// UpdateBookMeta is the resolver for the updateBookMeta field.
func (r *mutationResolver) UpdateBookMeta(ctx context.Context, inp graph.UpdateBookMetaInp) (*graph.BookMetadata, error) {
	var bookMeta models.BookMetadata
	if err := r.DB.First(&bookMeta, "id = ?", inp.ID).Error; err != nil {
		return nil, err
	}

	mergo.Merge(&bookMeta, inp)
	r.DB.Save(&bookMeta)

	return bookMeta.ToGraphModel(), nil
}

// BookMeta is the resolver for the bookMeta field.
func (r *queryResolver) BookMeta(ctx context.Context, id string) (*graph.BookMetadata, error) {
	var bookMeta models.BookMetadata
	if err := r.DB.First(&bookMeta, "id = ?", id).Error; err != nil {
		return nil, err
	}

	return bookMeta.ToGraphModel(), nil
}

// BookMetas is the resolver for the bookMetas field.
func (r *queryResolver) BookMetas(ctx context.Context) ([]*graph.BookMetadata, error) {
	var bookMetas []models.BookMetadata
	if err := r.DB.Find(&bookMetas).Error; err != nil {
		return nil, err
	}

	return utils.Map(bookMetas, func(meta models.BookMetadata) *graph.BookMetadata {
		return meta.ToGraphModel()
	}), nil
}

// BookMetadata returns graph.BookMetadataResolver implementation.
func (r *Resolver) BookMetadata() graph.BookMetadataResolver { return &bookMetadataResolver{r} }

type bookMetadataResolver struct{ *Resolver }
