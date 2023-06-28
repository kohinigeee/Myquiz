package handler

import (
	"html/template"
	"net/http"
)

func getTestPageHandle(w http.ResponseWriter, r *http.Request) {
	tmp, err := template.ParseFiles("./static/page/testpage/test.html")
	if err != nil {
		panic(err)
	}

	tmp.Execute(w, nil)
}

func TestPageHandler(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case "GET":
		getTestPageHandle(w, r)
	}
}
