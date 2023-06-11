
async function populate() {
    const requestURL = "http://localhost:8080/quiz/get?id=4"
    const request = new Request(requestURL)

    const response = await fetch(request)
    quiz = await response.json();

    return quiz
}

async function getAuthorID() {
    const requestURL = "http://localhost:8080/quiz/get_list?authorid=1&limit=10"
    const request = new Request(requestURL)

    const response = await fetch(request)
    quizs = await response.json()

    return quizs
}

function setQuestion( quiz ) {
    ele = document.querySelector("#question")
    ele.textContent = quiz.Question
}

function kotaeawase(event) {
    event
}

var q_no = 0
var quizsize

async function main() {
    quizs = await getAuthorID()
    quizsize = quizs.length 

    setQuestion(quizs[q_no])
    q_no += 1

    ele = document.querySelector("#answer")
    console.log("answer = ", ele.textContent)
}

main()