package resolvers

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.
// Code generated by github.com/99designs/gqlgen version v0.17.42

import (
	"context"

	"github.com/PICT-LibraryAutomation/granthpal/database/models"
	"github.com/PICT-LibraryAutomation/granthpal/graph"
	"github.com/PICT-LibraryAutomation/granthpal/utils"
	"github.com/google/uuid"
)

// Meta is the resolver for the meta field.
func (r *bookResolver) Meta(ctx context.Context, obj *graph.Book) (*graph.BookMetadata, error) {
	var meta models.BookMetadata
	if err := r.DB.First(&meta, "id = ?", obj.MetaID).Error; err != nil {
		return nil, err
	}

	return meta.ToGraphModel(), nil
}

// AddBookToInventory is the resolver for the addBookToInventory field.
func (r *mutationResolver) AddBookToInventory(ctx context.Context, inp graph.AddBookToInventoryInp) (*graph.Book, error) {
	book := models.Book{
		ID:     uuid.NewString(),
		MetaID: inp.MetaID,
	}
	if err := r.DB.Create(&book).Error; err != nil {
		return nil, err
	}

	return book.ToGraphModel(), nil
}

// Book is the resolver for the book field.
func (r *queryResolver) Book(ctx context.Context, id string) (*graph.Book, error) {
	var book models.Book
	if err := r.DB.First(&book, "id = ?", id).Error; err != nil {
		return nil, err
	}

	return book.ToGraphModel(), nil
}

// Books is the resolver for the books field.
func (r *queryResolver) Books(ctx context.Context) ([]*graph.Book, error) {
	var books []models.Book
	if err := r.DB.Find(&books).Error; err != nil {
		return nil, err
	}

	return utils.Map(books, func(book models.Book) *graph.Book {
		return book.ToGraphModel()
	}), nil
}

// Book returns graph.BookResolver implementation.
func (r *Resolver) Book() graph.BookResolver { return &bookResolver{r} }

type bookResolver struct{ *Resolver }
