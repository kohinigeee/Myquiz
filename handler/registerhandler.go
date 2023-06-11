package handler

import (
	"fmt"
	"github/kohinigeee/data"
	"github/kohinigeee/lib"
	"html/template"
	"net/http"
)

func RegisterLoginInfo(w http.ResponseWriter, r *http.Request) {
	r.ParseForm()

	nameid := r.PostForm.Get("nameid")
	password := r.PostForm.Get("password")
	logininfo := data.NewLoginInfo(nameid, password)

	err := logininfo.Create()

	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Println("RegisterLoginInfo::", err)
		return
	}

	fmt.Println("[Log] Succeded Account Register")
	fmt.Println("info = ", logininfo)
	account, err := data.GetAccount(logininfo.AccountId)

	if err != nil {
		w.WriteHeader(http.StatusBadGateway)
		return
	}

	gbsession := lib.GetGlobalSessions()
	sess := gbsession.SessionStart(w, r)

	sess.Set("account", account)
	w.WriteHeader(http.StatusOK)
	return
}

func RegisterLoginInfoGet(w http.ResponseWriter, r *http.Request) {
	tmp, err := template.ParseFiles("./static/page/register/account_register.html", "./static/component/header/header.html")

	if err != nil {
		panic(err)
	}

	tmp.Execute(w, nil)
}

func RegisterHandler(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case "GET":
		RegisterLoginInfoGet(w, r)
	case "POST":
		RegisterLoginInfo(w, r)
	}
}
