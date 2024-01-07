package resolvers

import (
	"go.uber.org/zap"
	"gorm.io/gorm"
)

//go:generate go run github.com/99designs/gqlgen generate

type Resolver struct {
	DB     *gorm.DB
	Logger *zap.SugaredLogger
}
