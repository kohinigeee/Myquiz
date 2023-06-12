package handler

import (
	"github/kohinigeee/lib"
	"net/http"
)

func LogoutHandler(w http.ResponseWriter, r *http.Request) {
	gbsession := lib.GetGlobalSessions()
	gbsession.SessionDestroy(w, r)

	//なぜかこの関数内ではaccountが生きている
	w.WriteHeader(http.StatusOK)
	return
}
