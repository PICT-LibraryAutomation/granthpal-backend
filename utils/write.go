package utils

import (
	"encoding/json"
	"net/http"
)

type ErrorResponse struct {
	Code    int    `json:"code"`
	Message string `json:"message"`
}

func (er *ErrorResponse) Write(w *http.ResponseWriter) {
	data, _ := json.Marshal(er)
	(*w).Header().Set("Content-Type", "application/json")
	(*w).WriteHeader(er.Code)
	(*w).Write(data)
}

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
