package handler

import (
	"fmt"
	"github/kohinigeee/data"
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

	fmt.Print("hahs := ", logininfo.HashPass)
	w.WriteHeader(http.StatusOK)
	return
}

func RegisterLoginInfoGet(w http.ResponseWriter, r *http.Request) {
	tmp, err := template.ParseFiles("./static/page/register/account_register.html")

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
