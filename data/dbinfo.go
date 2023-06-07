package data

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"os"

	_ "github.com/lib/pq"
)

type DbInfo struct {
	DBname   string `json:"dbname"`
	Username string `json:"dbusername"`
	Pass     string `json:"pass"`
}

// パスワードなどをハードコーディングしないために、
// 接続のための情報はpass.jsonに格納する
func MakeDbInfo() (DbInfo, error) {
	var dbinfo DbInfo
	jsonFile, err := os.Open("./data/pass.json")
	if err != nil {
		fmt.Println("[Error] open error JSON file:", err)
		return dbinfo, err
	}

	defer jsonFile.Close()

	jsonData, _ := ioutil.ReadAll(jsonFile)
	if err != nil {
		fmt.Println("[Error] reading JSON date:", err)
		return dbinfo, err
	}

	json.Unmarshal(jsonData, &dbinfo)

	return dbinfo, nil
}

var mydb *sql.DB

func init() {
	var err error
	dbinfo, err := MakeDbInfo()

	if err != nil {
		panic(err)
	}

	cmd := fmt.Sprintf("user=%s dbname=%s password=%s sslmode=disable", dbinfo.Username, dbinfo.DBname, dbinfo.Pass)
	fmt.Println(cmd)
	mydb, err = sql.Open("postgres", cmd)

	if err != nil {
		fmt.Println("[Error] can't connecnted data base [user::init]")
		panic(err)
	}

	fmt.Println("dbinof::init succseeded connection")
}
