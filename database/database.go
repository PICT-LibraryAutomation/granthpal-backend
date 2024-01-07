package database

import (
	"os"

	"github.com/PICT-LibraryAutomation/granthpal/database/models"
	"go.uber.org/zap"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func NewDatabase(logger *zap.SugaredLogger) (*gorm.DB, error) {
	dsn := os.Getenv("GRANTHPAL_DSN")
	if dsn == "" {
		logger.Fatalf("DSN not provided")
	}

	logger.Infof("Connected to Postgres")
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		return nil, err
	}

	db.AutoMigrate(&models.User{})
	db.AutoMigrate(&models.Book{})
	db.AutoMigrate(&models.BookMetadata{})
	db.AutoMigrate(&models.Author{})
	db.AutoMigrate(&models.Publisher{})
	db.AutoMigrate(&models.IssueInfo{})

	return db, nil
}
