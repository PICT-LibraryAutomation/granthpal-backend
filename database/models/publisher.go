package models

type Publisher struct {
	ID    string `gorm:"primaryKey"`
	Name  string
	Books []BookMetadata `gorm:"foreignKey:PublisherID"`
}
