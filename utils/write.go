package utils

import (
	"encoding/json"
	"net/http"
)

type Response struct {
	Code int
	Data any
}

func (r *Response) Write(w *http.ResponseWriter) {
	data, _ := json.Marshal(r.Data)
	(*w).Header().Set("Content-Type", "application/json")
	(*w).WriteHeader(r.Code)
	(*w).Write(data)
}
