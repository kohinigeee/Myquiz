package data

import (
	"errors"
	"fmt"

	"golang.org/x/crypto/bcrypt"
)

func PasswordEncrypt(password string) (string, error) {
	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)

	return string(hash), err
}

func CompareHashAndPassword(hash, password string) error {
	return bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
}

type LoginInfo struct {
	Nameid    string
	HashPass  string
	AccountId int
}

func NewLoginInfo(nameid, password string) LoginInfo {
	hash, err := PasswordEncrypt(password)
	if err != nil {
		panic(err)
	}

	return LoginInfo{Nameid: nameid, HashPass: hash, AccountId: 0}
}

func (info *LoginInfo) Create() error {

	if info.IsUniqueName() == false {
		return errors.New("This is not UniqueName")
	}

	account := Account{Name: info.Nameid}
	err := account.Create()

	if err != nil {
		return err
	}

	statement := "insert into logininfo ( nameid, hashpass, accountid ) values ($1, $2, $3)"

	stmt, err := mydb.Prepare(statement)
	if err != nil {
		return err
	}

	defer stmt.Close()
	stmt.QueryRow(info.Nameid, info.HashPass, account.Id)

	return nil
}

func (info *LoginInfo) IsUniqueName() bool {
	var result bool
	err := mydb.QueryRow("select exists(select nameid from logininfo where nameid = $1)", info.Nameid).Scan(&result)

	if err != nil {
		panic(err)
	}

	return !result
}

func (info *LoginInfo) Get() error {
	var name string
	err := mydb.QueryRow("select Nameid from logininfo where Nameid = $1", info.Nameid).Scan(&name)

	fmt.Println("name = ", name)
	fmt.Printf("name = %T\n", name)
	fmt.Print((name == ""))
	return err
}
