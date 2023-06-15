$(document).ready(function() {
    fetch("/api/quizmanage?genre=all")
    .then( response => {
        if ( !response.ok ) {
            return
        } 
        return response.json()
    })
    .then( data => {
        console.log("data=",data)
    })
    .catch(err => {
        console.error(err)
    })
})