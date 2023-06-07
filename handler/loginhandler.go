package handler

import (
	"fmt"
	"github/kohinigeee/data"
	"github/kohinigeee/lib"
	"html/template"
	"net/http"
)

func loginPostHandle(w http.ResponseWriter, r *http.Request) {
	r.ParseForm()

	nameid := r.PostForm.Get("nameid")
	password := r.PostForm.Get("password")

	info, result := data.IsCollectInfo(nameid, password)

	if !result {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	session := lib.GetGlobalSessions()
	sess := session.SessionStart(w, r)

	sess.Set("id", info.AccountId)

	w.WriteHeader(http.StatusOK)
	return
}

func loginGetHandle(w http.ResponseWriter, r *http.Request) {
	tmp, err := template.ParseFiles("./static/login.html")
	if err != nil {
		panic(err)
	}

	tmp.Execute(w, nil)
}

func LoginHandler(w http.ResponseWriter, r *http.Request) {

	switch r.Method {
	case "POST":
		fmt.Println("Login Post function")
		loginPostHandle(w, r)
	case "GET":
		loginGetHandle(w, r)
	}
}
