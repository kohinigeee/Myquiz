package handler

import (
	"fmt"
	"html/template"
	"net/http"
)

func QuizManagerGetHandle(w http.ResponseWriter, r *http.Request) {
	tmp, err := template.ParseFiles("./static/page/quizmanager/quizmanager.html", "./static/component/header/header.html")

	if err != nil {
		panic(err)
	}

	tmp.Execute(w, nil)
	return
}

func QuizManagerHandler(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case "GET":
		QuizManagerGetHandle(w, r)
	default:
		fmt.Println("Test")
	}
}
