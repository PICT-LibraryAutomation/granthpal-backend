package models

type BookMetadata struct {
	ID          string `gorm:"primaryKey"`
	Name        string
	Abstract    string
	ISBN        string
	Authors     []Author `gorm:"many2many:author_books;"`
	PublisherID string
	Books       []Book `gorm:"foreignKey:MetaID"`
}
