package handler

import (
	"github/kohinigeee/data"
	"github/kohinigeee/lib"
	"html/template"
	"net/http"
)

func IndexHandle(w http.ResponseWriter, r *http.Request) {
	sesison := lib.GetGlobalSessions()
	sess := sesison.SessionStart(w, r)
	id := sess.Get("id")

	if id == nil {
		id = 0
		sess.Set("id", id)
	}

	account, err := data.GetAccount(id.(int))

	if err != nil {
		account = data.Account{Name: "Guest Account", Id: 0}
	}

	tmp, _ := template.ParseFiles("./static/index.html")
	tmp.Execute(w, account)
}

func IndexHandler(w http.ResponseWriter, r *http.Request) {
	IndexHandle(w, r)
}
