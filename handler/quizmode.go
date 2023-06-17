package handler

import (
	"github/kohinigeee/lib"
	"html/template"
	"net/http"
)

func quizModeGetHandler(w http.ResponseWriter, r *http.Request) {

	tmp, err := template.ParseFiles("./static/page/quizmode/quizmode.html", lib.HeaderPagePath)

	if err != nil {
		panic(err)
	}

	tmp.Execute(w, nil)
}

func QuizModeHandle(w http.ResponseWriter, r *http.Request) {

	switch r.Method {
	case "GET":
		quizModeGetHandler(w, r)
	}
}
