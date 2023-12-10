package utils

type contextKey struct {
	name string
}

var DatabaseCtxKey = &contextKey{name: "Database"}
