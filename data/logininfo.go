package data

import (
	"errors"

	"golang.org/x/crypto/bcrypt"
)

func PasswordEncrypt(password string) (string, error) {
	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)

	return string(hash), err
}

func CompareHashAndPassword(hash, password string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	if err == nil {
		return true
	}
	return false
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

	info.AccountId = account.Id
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

func (info *LoginInfo) CollectPassword(password string) bool {
	return CompareHashAndPassword(info.HashPass, password)
}

func GetLoginInfo(nameid string) (LoginInfo, error) {
	var info LoginInfo
	err := mydb.QueryRow("select nameid, hashpass, accountid from logininfo where nameid = $1", nameid).Scan(&info.Nameid, &info.HashPass, &info.AccountId)

	if err != nil {
		return LoginInfo{}, err
	}
	return info, nil
}

func IsCollectInfo(nameid, password string) (LoginInfo, bool) {
	info, err := GetLoginInfo(nameid)
	if err != nil {
		return info, false
	}

	if info.CollectPassword(password) {
		return info, true
	}

	return info, false
}
