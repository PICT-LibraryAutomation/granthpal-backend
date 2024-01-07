package main

import (
	"log"
	"net/http"
	"os"

	"github.com/PICT-LibraryAutomation/granthpal/database"
	"github.com/PICT-LibraryAutomation/granthpal/routes"
	"github.com/PICT-LibraryAutomation/granthpal/utils"
	"github.com/go-chi/chi/v5"
	"github.com/joho/godotenv"
)

const defaultPort = "8080"

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Couldn't load .env")
	}

	port := os.Getenv("GRANTHPAL_PORT")
	if port == "" {
		port = defaultPort
	}

	isDev := false
	if os.Getenv("GRANTHPAL_ENV") == "dev" {
		isDev = true
	}

	dsn := os.Getenv("GRANTHPAL_DSN")
	if dsn == "" {
		log.Fatalf("DSN not provided")
	}

	logger := utils.CreateLogger(isDev)
	defer logger.Sync()
	sugar := logger.Sugar()

	db, err := database.NewDatabase(dsn)
	if err != nil {
		log.Fatal(err)
	}

	router := chi.NewRouter()
	router.Use(utils.LoggerMiddleware(sugar))
	router.Use(database.DatabaseMiddleware(db))

	router.Mount("/gql", routes.GraphQLRouter(db, sugar))

	sugar.Infof("Listening at http://localhost:%s", port)
	sugar.Fatal(http.ListenAndServe(":"+port, router))
}
