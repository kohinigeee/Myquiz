package lib

import (
	"encoding/json"
	"fmt"
	"github/kohinigeee/data"
	"net/http"
	"strconv"
)

func RequestGetQuizByAuthorid(w http.ResponseWriter, r *http.Request) {

	fmt.Println("[Log] RequestGetQuizByAuhtorid")
	r.ParseForm()

	limit_s := r.Form["limit"][0]
	limit, _ := strconv.Atoi(limit_s)

	authorid_s := r.Form["authorid"][0]
	authorid, _ := strconv.Atoi(authorid_s)

	quizs, _ := data.GetQuizByAuthorId(authorid)

	var ans []data.Quiz

	if len(quizs) <= limit {
		ans = quizs[:]
	} else {
		ans = quizs[:limit]
	}

	w.Header().Set("Content-Type", "application/json")
	json, _ := json.Marshal(ans)

	w.Write(json)
}
