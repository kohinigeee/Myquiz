package data

// type QuizType struct {
// 	Id   int
// 	Name string
// }

// func GetAllQuizType() (array []QuizType, err error) {
// 	statement := "select * from quiztype"

// 	rows, err := mydb.Query(statement)

// 	if err != nil {
// 		return
// 	}

// 	for rows.Next() {
// 		quiztype := QuizType{}
// 		err = rows.Scan(&quiztype.Id, &quiztype.Name)

// 		if err != nil {
// 			return
// 		}
// 		array = append(array, quiztype)
// 	}

// 	rows.Close()
// 	return
// }
