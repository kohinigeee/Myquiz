function htmlStrToElement(htmlStr) {
    const dummyDiv = document.createElement("div")
    dummyDiv.innerHTML = htmlStr;
    return dummyDiv.firstElementChild;
}

function sleepms(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

$(document).ready(async function () {
    fetch("/api/quizmanage?genre=all")
        .then(response => {
            if (!response.ok) {
                return
            }
            return response.json()
        })
        .then(data => {
            console.log("data=", data)
        })
        .catch(err => {
            console.error(err)
        })
})