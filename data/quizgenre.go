package data

import "fmt"

type QuizGenre struct {
	Id   int
	Name string
}

func GetAllQuizGenre() (array []QuizGenre, err error) {
	statement := "select * from quizgenre"

	rows, err := mydb.Query(statement)

	if err != nil {
		return
	}

	for rows.Next() {
		genre := QuizGenre{}
		err = rows.Scan(&genre.Id, &genre.Name)

		if err != nil {
			return
		}
		array = append(array, genre)
	}

	rows.Close()
	return
}

type QuizType struct {
	Id   int
	Name string
}

func GetAllQuizType() (array []QuizType, err error) {
	statement := "select * from quiztype"

	rows, err := mydb.Query(statement)

	if err != nil {
		return
	}

	for rows.Next() {
		quiztype := QuizType{}
		err = rows.Scan(&quiztype.Id, &quiztype.Name)

		if err != nil {
			return
		}
		array = append(array, quiztype)
	}

	rows.Close()
	return
}

type QuizTypeValues struct {
	simpleTypeId    int
	opt4TypeId      int
	imgSimpleTypeId int
	imgOpt4TypeId   int
}

func (values *QuizTypeValues) GetSimpleTypeId() int {
	return values.simpleTypeId
}
func (values *QuizTypeValues) GetOpt4TypeId() int {
	return values.opt4TypeId
}
func (values *QuizTypeValues) GetImgSimplTypeId() int {
	return values.imgSimpleTypeId
}
func (values *QuizTypeValues) GetImgOpt4TypeId() int {
	return values.imgOpt4TypeId
}

var quizTypeValues QuizTypeValues

func SetQuizTypeValues() {
	types, err := GetAllQuizType()

	if err != nil {
		fmt.Println("[Error] quizgenre.go SetQuizTypeValues function")
		panic(err)
	}

	for _, v := range types {
		switch v.Name {
		case "一問一答":
			quizTypeValues.simpleTypeId = v.Id
		case "四択問題":
			quizTypeValues.opt4TypeId = v.Id
		case "画像付き一問一答":
			quizTypeValues.imgSimpleTypeId = v.Id
		case "画像付き四択問題":
			quizTypeValues.imgOpt4TypeId = v.Id
		}
	}
}

func GetQuizTypeValues() *QuizTypeValues {
	return &quizTypeValues
}

func init() {
	SetQuizTypeValues()
	fmt.Println("Succeded set QuizTypes")
}
