package database

import (
	"os"

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
	return gorm.Open(postgres.Open(dsn), &gorm.Config{})
}
