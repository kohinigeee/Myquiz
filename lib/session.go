package lib

import (
	"github/kohinigeee/data"

	"github.com/astaxie/session"
	_ "github.com/astaxie/session/providers/memory"
)

type SessionHaveNoValueError struct {
	message string
}

func (e *SessionHaveNoValueError) Error() string {
	return e.message
}

var globalSessions *session.Manager

func init() {
	const sessionLimitTime = 1200
	var err error
	globalSessions, err = session.NewManager("memory", "gosessionid", 1200)
	if err != nil {
		panic(err)
	}
	go globalSessions.GC()
}

// Globalセッションの取得関数
func GetGlobalSessions() *session.Manager {
	return globalSessions
}

// 当セッションに登録されているアカウントの取得関数
func GetSessionAccount(sess *session.Session) (account data.Account) {
	account_i := (*sess).Get("account")

	if account_i == nil {
		account = data.CreateGuestAccount()
		(*sess).Set("account", account)
		return
	}

	account = account_i.(data.Account)
	return
}
