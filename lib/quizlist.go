package lib

// func RequestGetQuizByAuthorid(w http.ResponseWriter, r *http.Request) {

// 	fmt.Println("[Log] RequestGetQuizByAuhtorid")
// 	r.ParseForm()

// 	limit_s := r.Form["limit"][0]
// 	limit, _ := strconv.Atoi(limit_s)

// 	authorid_s := r.Form["authorid"][0]
// 	authorid, _ := strconv.Atoi(authorid_s)

// 	quizs, _ := data.GetQuizByAuthorId(authorid)

// 	var ans []data.Quiz

// 	if len(quizs) <= limit {
// 		for _, val := range quizs {
// 			ans = append(ans, &val)
// 		}
// 	} else {
// 		for i := 0; i < limit; i++ {
// 			ans = append(ans, &quizs[i])
// 		}
// 	}

// 	w.Header().Set("Content-Type", "application/json")
// 	json, _ := json.Marshal(ans)

// 	w.Write(json)
// }
