package handler

import (
	"fmt"
	"html/template"
	"net/http"
)

func RegisterLoginInfo(w http.ResponseWriter, r *http.Request) {
	r.ParseForm()

	fmt.Print(r.PostForm)
}

func RegisterLoginInfoGet(w http.ResponseWriter, r *http.Request) {
	tmp, err := template.ParseFiles("./static/account_register.html")

	if err != nil {
		panic(err)
	}

	tmp.Execute(w, nil)
}

func RegisterHandler(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case "GET":
		fmt.Println("Call GET")
		RegisterLoginInfoGet(w, r)
	case "POST":
		RegisterLoginInfo(w, r)
	}
}
