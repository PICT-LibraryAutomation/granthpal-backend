package utils

type contextKey struct {
	name string
}

var LoggerKey = &contextKey{name: "Logger"}
var DatabaseKey = &contextKey{name: "Database"}
var AuthKey = &contextKey{name: "Auth"}
var SessionsManagerKey = &contextKey{name: "SessionsManager"}
