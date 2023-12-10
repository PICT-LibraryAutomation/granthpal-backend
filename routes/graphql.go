package routes

import (
	"net/http"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/PICT-LibraryAutomation/granthpal/graph"
)

func GraphQLSandbox(gqlRoute string) http.Handler {
	return playground.ApolloSandboxHandler("Sandbox", gqlRoute)
}

func GraphQL() http.Handler {
	srv := handler.NewDefaultServer(graph.NewExecutableSchema(graph.Config{Resolvers: &graph.Resolver{}}))

	return srv
}
