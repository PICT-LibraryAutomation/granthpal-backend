package utils

type contextKey struct {
	name string
}

var LoggerKey = &contextKey{name: "Logger"}
var DatabaseKey = &contextKey{name: "Database"}
