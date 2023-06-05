package data

import (
	"fmt"

	_ "github.com/lib/pq"
)

type Account struct {
	Id   int
	Name string
}

func (account *Account) Create() error {
	statement := "insert into account (name) values ($1) returning id"

	stmt, err := mydb.Prepare(statement)
	if err != nil {
		return err
	}

	defer stmt.Close()
	err = stmt.QueryRow(account.Name).Scan(&account.Id)

	if err != nil {
		fmt.Print("[Error] query row error [Account::Create]")
		return err
	}

	return nil
}

func GetAccount(id int) (account Account, err error) {
	account = Account{}
	err = mydb.QueryRow("select id, name from account where id = $1", id).Scan(&account.Id, &account.Name)
	return
}
