package models

type Book struct {
	ID        string `gorm:"primaryKey"`
	MetaID    string
	IssueInfo IssueInfo `gorm:"foreignKey:BookID"`
}
