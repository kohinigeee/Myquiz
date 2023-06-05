package main

import (
	"encoding/json"
	"github/kohinigeee/data"
	"github/kohinigeee/handler"
	"html/template"
	"net/http"
	"os"
	"strconv"
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

	// fmt.Println("Program is execution")
	// fmt.Println("New Text")
	server.ListenAndServe()

}
