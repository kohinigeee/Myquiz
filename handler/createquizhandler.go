package handler

import (
	"github/kohinigeee/data"
	"github/kohinigeee/lib"
	"html/template"
	"net/http"
)

func createQuizGetHandle(w http.ResponseWriter, r *http.Request) {
	tmp, err := template.ParseFiles("./static/page/createquiz/createquiz.html", lib.HeaderPagePath)

	if err != nil {
		panic(err)
	}

	tmp.Execute(w, nil)
}

func createQuizPostHandle(w http.ResponseWriter, r *http.Request) {
	r.ParseForm()

	gbsessions := lib.GetGlobalSessions()
	sess := gbsessions.SessionStart(w, r)

	account_i := sess.Get("account")
	if account_i == nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	account := account_i.(data.Account)
	if account.IsGuest() {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	question := r.PostForm.Get("question")
	answer := r.PostForm.Get("answer")

	quiz := data.NewQuiz(question, answer, account.Id)

	err := quiz.Create()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
	}

	w.WriteHeader(http.StatusOK)
}

func CreateQuizHandler(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case "GET":
		createQuizGetHandle(w, r)
	case "POST":
		createQuizPostHandle(w, r)
	}
}
