package routes

import (
	"github.com/go-chi/chi/v5"
)

func RegisterRoutes(router *chi.Mux) {
	(*router).Handle("/sandbox", GraphQLSandbox("/graphql"))
	(*router).Handle("/graphql", GraphQL())
}
