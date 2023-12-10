package main

import (
	"log"
	"net/http"
	"os"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/PICT-LibraryAutomation/granthpal/database"
	"github.com/PICT-LibraryAutomation/granthpal/graph"
	"github.com/PICT-LibraryAutomation/granthpal/middleware"
	"github.com/go-chi/chi/v5"
	chiMiddleware "github.com/go-chi/chi/v5/middleware"
	"github.com/joho/godotenv"
)

const defaultPort = "5000"

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	port := os.Getenv("GRANTHPAL_PORT")
	if port == "" {
		port = defaultPort
	}

	db, err := database.ConnectToDatabase()
	if err != nil {
		log.Fatal("Couldn't connect to database")
	}
	log.Printf("Connected to Database")

	router := chi.NewRouter()
	router.Use(chiMiddleware.Logger)
	router.Use(middleware.DatabaseMiddleware(db))

	srv := handler.NewDefaultServer(
		graph.NewExecutableSchema(
			graph.Config{
				Resolvers: graph.NewResolver(db),
			},
		),
	)

	router.Handle("/query", srv)
	router.Handle("/sandbox", playground.ApolloSandboxHandler("Sandbox", "/query"))

	log.Printf("Connect to http://localhost:%s/", port)
	log.Fatal(http.ListenAndServe(":"+port, router))
}
