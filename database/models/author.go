package models

type Author struct {
	ID    string `gorm:"primaryKey"`
	Name  string
	Books []BookMetadata `gorm:"many2many:author_books;"`
}
