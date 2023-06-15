package data

import "fmt"

type Quiz struct {
	Id        int    `json: "id"`
	Question  string `json: "question"`
	Answer    string `json: "answer"`
	AuthorsId int    `json: "author_id"`
}

func NewQuiz(question, answer string, authorid int) Quiz {
	return Quiz{Id: 0, Question: question, Answer: answer, AuthorsId: authorid}
}

func (quiz *Quiz) Create() error {
	statement := "insert into quiz (problem, answer, author_id) values ($1, $2, $3) returning id"

	stmt, err := mydb.Prepare(statement)
	if err != nil {
		return err
	}

	defer stmt.Close()
	err = stmt.QueryRow(quiz.Question, quiz.Answer, quiz.AuthorsId).Scan(&quiz.Id)

	if err != nil {
		fmt.Print("[Error] qery row error [Quiz::Create]")
	}

	return nil
}

func GetQuizById(id int) (quiz Quiz, err error) {

	err = mydb.QueryRow("select id, problem, answer, author_id from quiz where id = $1", id).Scan(&quiz.Id, &quiz.Question, &quiz.Answer, &quiz.AuthorsId)
	return
}

func GetQuizByAuthorId(author_id int) (quizs []Quiz, err error) {
	rows, err := mydb.Query("select id, problem, answer from quiz where author_id = $1", author_id)
	if err != nil {
		return
	}

	for rows.Next() {
		quiz := Quiz{AuthorsId: author_id}
		err = rows.Scan(&quiz.Id, &quiz.Question, &quiz.Answer)

		if err != nil {
			return
		}
		quizs = append(quizs, quiz)
	}

	rows.Close()
	return
}

func DeleteQuizByID(id int) (err error) {
	_, err = mydb.Exec("delete from quiz where id = $1", id)
	return
}
