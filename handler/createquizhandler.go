package handler

import (
	"bytes"
	"encoding/json"
	"fmt"
	"github/kohinigeee/data"
	"github/kohinigeee/lib"
	"html/template"
	"io/ioutil"
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
	//requestからtypeIdを取り出すためだけの一時クラス
	type TypeId struct {
		Id int `json:"type"`
	}

	r.ParseForm()

	gbsessions := lib.GetGlobalSessions()
	sess := gbsessions.SessionStart(w, r)

	account := lib.GetSessionAccount(&sess)

	if account.IsGuest() {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	bodyReader := bytes.NewReader(body)
	bodyReader2 := bytes.NewReader(body)

	var tmp TypeId
	err = json.NewDecoder(bodyReader).Decode(&tmp)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	quizTypeValues := data.GetQuizTypeValues()
	var createFunc func(int, *bytes.Reader) (err error)

	// 問題のタイプによってクリエイト関数を分岐
	switch tmp.Id {
	case quizTypeValues.GetSimpleTypeId():
		createFunc = createSimpleQuiz
	default:
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	err = createFunc(account.Id, bodyReader2)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	w.WriteHeader(http.StatusOK)
	return
}

func CreateQuizHandler(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case "GET":
		createQuizGetHandle(w, r)
	case "POST":
		createQuizPostHandle(w, r)
	}
}

func createSimpleQuiz(authorId int, body *bytes.Reader) (err error) {
	fmt.Println("[Log] createSimpleQuiz function")
	err = nil
	var quiz data.SimpleQuiz
	quiz.SetNewIndex()

	err = json.NewDecoder(body).Decode(&quiz)
	quiz.AuthorsId = authorId

	if err != nil {
		fmt.Println("[Error] createSimpleQuiz /createquizhandler.go")
		return
	}

	err = quiz.Create()
	fmt.Println(quiz)

	if err != nil {
		fmt.Println("[Error] createSimpleQuiz /createquizhandler.go : Cant Create Quiz")
		return
	}

	return
}
