package handlerapi

import (
	"encoding/json"
	"github/kohinigeee/data"
	"github/kohinigeee/lib"
	"net/http"
)

func getQuizlistAll(w http.ResponseWriter, r *http.Request) {
	gbsessions := lib.GetGlobalSessions()
	sess := gbsessions.SessionStart(w, r)

	account_i := sess.Get("account")

	if account_i == nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	account := account_i.(data.Account)
	quizlist, err := data.GetQuizByAuthorId(account.Id)

	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	json, err := json.Marshal(quizlist)
	if err != nil {
		panic(err)
	}

	w.WriteHeader(http.StatusOK)
	w.Header().Set("Content-Type", "application/json")
	w.Write(json)
	return
}

func quizManageGetAPI(w http.ResponseWriter, r *http.Request) {
	r.ParseForm()

	genre := r.Form.Get("genre")

	switch genre {
	case "all":
		getQuizlistAll(w, r)
	default:
		w.WriteHeader(http.StatusBadRequest)
	}
}

func QuizManageAPIHandle(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case "GET":
		quizManageGetAPI(w, r)
	}
}
