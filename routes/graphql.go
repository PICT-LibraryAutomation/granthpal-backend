package routes

import (
	"net/http"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/PICT-LibraryAutomation/granthpal/graph"
	"github.com/PICT-LibraryAutomation/granthpal/graph/resolvers"
	"github.com/go-chi/chi/v5"
	"go.uber.org/zap"
	"gorm.io/gorm"
)

const queryRoute = "/query"

func GraphQLRouter(db *gorm.DB, logger *zap.SugaredLogger) *chi.Mux {
	router := chi.NewRouter()
	router.Handle(queryRoute, graphqlServer(db, logger))
	router.Handle("/sandbox", playgroundHandler(queryRoute))
	return router
}

func graphqlServer(db *gorm.DB, logger *zap.SugaredLogger) *handler.Server {
	return handler.NewDefaultServer(graph.NewExecutableSchema(graph.Config{Resolvers: &resolvers.Resolver{
		DB:     db,
		Logger: logger,
	}}))
}

func playgroundHandler(queryRoute string) http.HandlerFunc {
	return playground.ApolloSandboxHandler("Sandbox", queryRoute)
}
