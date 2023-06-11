package handlerapi

import (
	"encoding/json"
	"github/kohinigeee/data"
	"github/kohinigeee/lib"
	"net/http"
)

//accountに関するapi

func GetSessionAccountAPI(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	gbsession := lib.GetGlobalSessions()
	sess := gbsession.SessionStart(w, r)

	account_i := sess.Get("account")
	if account_i == nil {
		account_i = data.CreateGuestAccount()
	}

	account := account_i.(data.Account)

	json, _ := json.Marshal(account)
	w.Write(json)
}

func AccountAPIHandler(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case "GET":
		GetSessionAccountAPI(w, r)
	}
}
