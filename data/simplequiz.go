package data

import (
	"fmt"
	"time"
)

type SimpleQuiz struct {
	Id          int       `json:"id"`
	Question    string    `json:"question"`
	Answer      string    `json:"answer"`
	Commentary  string    `json:"commentary"`
	AuthorsId   int       `json:"authorId"`
	TypeId      int       `json:"type"`
	GenreId     int       `json:"genre"`
	UpdatedTime time.Time `json:"updatedTime"`
}

func (quiz *SimpleQuiz) GetTypeId() int {
	return quiz.Id
}

func (quiz *SimpleQuiz) SetNewIndex() {
	quiz.Id = 0
}

func (quiz *SimpleQuiz) Create() error {
	statement := "insert into simplequiz (problem, answer, commentary, author_id, type_id, genre_id) values ($1, $2, $3, $4, $5, $6) returning id, updated_time"

	stmt, err := mydb.Prepare(statement)
	if err != nil {
		return err
	}

	defer stmt.Close()
	err = stmt.QueryRow(quiz.Question, quiz.Answer, quiz.Commentary, quiz.AuthorsId, quiz.TypeId, quiz.GenreId).Scan(&quiz.Id, &quiz.UpdatedTime)

	if err != nil {
		fmt.Print("[Error] qery row error [Quiz::Create]")
	}

	return nil
}

func GetQuizById(id int) (quiz SimpleQuiz, err error) {

	err = mydb.QueryRow("select id, problem, answer, commentary, author_id, type_id , genre_id, updated_time from simplequiz where id = $1", id).Scan(&quiz.Id, &quiz.Question, &quiz.Answer, &quiz.Commentary, &quiz.AuthorsId, &quiz.TypeId, &quiz.GenreId, &quiz.UpdatedTime)
	return
}

func GetQuizByAuthorId(author_id int) (quizs []SimpleQuiz, err error) {
	rows, err := mydb.Query("select id, problem, answer, commentary, type_id, genre_id, updated_time from simplequiz where author_id = $1", author_id)
	if err != nil {
		return
	}

	for rows.Next() {
		quiz := SimpleQuiz{AuthorsId: author_id}
		err = rows.Scan(&quiz.Id, &quiz.Question, &quiz.Answer, &quiz.Commentary, &quiz.TypeId, &quiz.GenreId, &quiz.UpdatedTime)

		if err != nil {
			return
		}
		quizs = append(quizs, quiz)
	}

	rows.Close()
	return
}

func DeleteQuizByID(id int) (err error) {
	_, err = mydb.Exec("delete from simplequiz where id = $1", id)
	return
}
