package handlerapi

import (
	"encoding/json"
	"fmt"
	"github/kohinigeee/data"
	"net/http"
	"strings"
)

func getQuizOptions(w http.ResponseWriter, r *http.Request) {

	r.ParseForm()

	val := r.Form["infotags"][0]

	infoTags := strings.Split(val, " ")
	ansMap := make(map[string]interface{})
	isValidStatus := true

	for _, value := range infoTags {
		switch value {
		case "genre":
			array, err := data.GetAllQuizGenre()
			if err != nil {
				isValidStatus = false
			} else {
				ansMap[value] = array
			}
		case "type":
			array, err := data.GetAllQuizType()
			if err != nil {
				isValidStatus = false
			} else {
				ansMap[value] = array
			}
		default:
			fmt.Println("[Error] getQuizOptions:: invalid param =", value)
		}
	}

	json, err := json.Marshal(ansMap)
	if err != nil {
		isValidStatus = false
	}

	if !isValidStatus {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Header().Set("Content-Type", "application/json")
	w.Write(json)
	return
}

func QuizGenreAPIHandle(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case "GET":
		getQuizOptions(w, r)
	}
}
