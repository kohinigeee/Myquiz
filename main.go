package main

import (
	"encoding/json"
	"fmt"
	"github/kohinigeee/data"
	"github/kohinigeee/handler"
	"github/kohinigeee/handlerapi"
	"html/template"
	"net/http"
	"os"
	"strconv"

	_ "github/kohinigeee/lib"
)

func Quiz(w http.ResponseWriter, r *http.Request) {

	tmp, err := template.ParseFiles("./static/quizlist.html", "./static/quiz.html")
	if err != nil {
		return
	}

	tmp.Execute(w, nil)
}

func GetQuiz(w http.ResponseWriter, r *http.Request) {
	r.ParseForm()

	quizid_s := r.Form["id"][0]
	quizid, _ := strconv.Atoi(quizid_s)

	w.Header().Set("Content-Type", "application/json")
	quiz, _ := data.GetQuizById(quizid)

	json, _ := json.Marshal(quiz)
	w.Write(json)
}

func main() {

	server := http.Server{
		Addr: "127.0.0.1:8080",
	}

	dir, _ := os.Getwd()
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir(dir+"/static/"))))

	// http.HandleFunc("/quiz", Quiz)
	// http.HandleFunc("/quiz/get", GetQuiz)
	// http.HandleFunc("/quiz/get_list", lib.RequestGetQuizByAuthorid)
	http.HandleFunc("/register", handler.RegisterHandler)
	http.HandleFunc("/index", handler.IndexHandler)
	http.HandleFunc("/login", handler.LoginHandler)
	http.HandleFunc("/logout", handler.LogoutHandler)
	http.HandleFunc("/manager", handler.QuizManagerHandler)

	http.HandleFunc("/account", handlerapi.AccountAPIHandler)

	fmt.Println("Program is execution")
	server.ListenAndServe()

}
