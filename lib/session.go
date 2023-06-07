package lib

import (
	"github.com/astaxie/session"
	_ "github.com/astaxie/session/providers/memory"
)

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

func GetGlobalSessions() *session.Manager {
	return globalSessions
}
