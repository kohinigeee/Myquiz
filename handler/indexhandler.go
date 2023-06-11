package handler

import (
	"github/kohinigeee/data"
	"github/kohinigeee/lib"
	"html/template"
	"net/http"
)

func sample() bool {
	return true
}
func IndexHandle(w http.ResponseWriter, r *http.Request) {
	sesison := lib.GetGlobalSessions()
	sess := sesison.SessionStart(w, r)

	account_i := sess.Get("account")

	if account_i == nil {
		account_i = data.CreateGuestAccount()
		sess.Set("account", account_i.(data.Account))
	}

	account := account_i.(data.Account)

	fname1 := "./static/page/index/index.html"

	funcMap := template.FuncMap{"isguest": account.IsGuest}
	tmp := template.New("index.html").Funcs(funcMap)
	tmp, err := tmp.ParseFiles(fname1, "./static/component/header/header.html")
	if err != nil {
		panic(err)
	}

	tmp.Execute(w, account)
}

func IndexHandler(w http.ResponseWriter, r *http.Request) {
	IndexHandle(w, r)
}
