function htmlStrToElement(htmlStr) {
    const dummyDiv = document.createElement("div")
    dummyDiv.innerHTML = htmlStr;
    return dummyDiv.firstElementChild;
}

function createSimpleQuizResultElementTrue() {
    const htmlStr = `<div id="result" style="visibility: hidden" class="mt-3 mb-3">
        <div class="d-flex flex-grow-1">
            <div class="animate__animated animate__flash animate__delay-1s d-flex flex-grow-1 align-items-center justify-content-center">
                <img src="./static/img/circle_ico.svg" width="40" height="40" class="mr-2">
                    <p class="mytext-primary mb-0" style="font-size: 180%;">正解！</p>
            </div>
            <div class="d-flex justify-content-end">
                <button id="result_next_btn" class="simple_quiz_top_next_btn mybg-primary d-flex justify-content-center align-items-center"
                    style="border: none;">
                    <img src="./static/img/next_ico.svg" width="40" height="35" class="text-right">
                        <small class="mytext-primary text-center">next</small>
                </button>
            </div>
        </div>
    </div>`
    return htmlStrToElement(htmlStr)
}

function createSimpleQuizResultElementFalse() {
    const htmlStr = `<div id="result" style="visibility: hidden" class="mt-3 mb-3">
                            <div class="d-flex flex-grow-1">
                                <div class="animate__animated animate__headShake animate__delay-1s d-flex flex-grow-1 align-items-center justify-content-center">
                                <img src="./static/img/xmark_ico.svg" width="40" height="40" class="mr-2">
                                <p class="mb-0" style="color : #1e4588; font-size: 180%; font-weight: 500;">不正解！</p>
                                </div>
                                <div class="d-flex justify-content-end">
                                    <button id="result_next_btn" class="simple_quiz_top_next_btn mybg-primary d-flex justify-content-center align-items-center"
                                        style="border: none;">
                                        <img src="./static/img/next_ico.svg" width="40" height="35" class="text-right">
                                        <small class="mytext-primary text-center">Next</small>
                                    </button>
                                </div>
                            </div>
                        </div>`
    return htmlStrToElement(htmlStr)
}

function createSimpleQuizFormElement() {
    const htmlStr = `<div id="question_form" class="container col-12">
                        <div id="result" style="visibility: hidden" class="mt-3 mb-3">
                            <div class="d-flex">
                                <div class="animate__animated animate__flash animate__delay-1s d-flex align-items-center">
                                <img src="./static/img/circle_ico.svg" width="40" height="40" class="mr-2">
                                <p class="mytext-primary mb-0" style="font-size: 180%;">正解！</p>
                                </div>
                                <div class="flex-grow-1 d-flex justify-content-end">
                                    <button class="mybg-primary d-flex justify-content-center align-items-center"
                                        style="border: none;">
                                        <img src="./static/img/next_ico.svg" width="40" height="35" class="text-right">
                                        <small class="mytext-primary text-center">Next</small>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div class="col-12 my_question_flame pl-2 pr-2 mt-2 d-flex flex-column justify-content-center
                        mybg-secondary">
                            <div class="mt-1 mb-2 p-0">
                                <div class="card">
                                    <div class="card-body pl-3 pr-1 pt-1 pb-1">
                                        <h5 class="pb-1 card-title d-inline mytext-primary" style="font-weight: bold;">
                                            Question
                                        </h5>
                                        <hr class="mt-1 mb-1">
                                        <p id="question_text" class="card-text">
                                            問題文テテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
                                        </p>
                                    </div>
                                </div>

                                <div id="description" class="card mt-1 collapse">
                                    <div id="correct" class="card-body">
                                        <h5 class="pb-1 card-title d-inline mytext-primary" style="font-weight: bold;">
                                            Correct Answer
                                        </h5>
                                        <hr class="mt-1 mb-1">
                                        <p id="answer_text" class="card-text" style="font-size: 115%;">正しい答え</p>
                                    </div>

                                    <div id="kaisetu" class="card-body pt-1">
                                        <h5 class="pb-1 card-title d-inline mytext-primary"
                                            style="font-weight: bold; font-size: 110%;">
                                            解説
                                        </h5>
                                        <hr class="mt-1 mb-1">
                                        <p id="description_text" class="card-text" style="font-size: 95%;">解説
                                            ああああああああああああああああああああああああああああああああああああああああああああああああああああああああ
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row mt-5 d-felx justify-content-between">

                                <div class="container col-8 ml-3 pl-2 pr-2 mybg-secondary my_answer_flame d-flex">
                                    <div class="card mt-2 mb-2 flex-grow-1 d-flex">
                                        <div class="card-body pl-2 pt-2 pb-2 flex-grow-1">
                                            <h5 class="card-title d-inline mytext-primary" style="font-weight: bold;">
                                                Answer
                                            </h5>
                                            <hr class="mt-1 mb-1">
                                            <textarea id="answer_form" class="card-text form-control-plaintext" rows="1"
                                                placeholder="回答欄" style="resize: none;"></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div class="mt-3 d-flex justify-content-end flex-column">
                                    <div class="simple_quiz_btn">
                                        <button id="quiz_answer_btn">
                                            回答
                                        </button>
                                    </div>
                                </div>
                        </div>
                    </div>`
    return htmlStrToElement(htmlStr)
}

//一問一答形式のクイズのクラス
class SimpleQuiz {

    constructor(quiz) {
        this.quiz = quiz
        this.result = undefined
        this.nextfunc = undefined

        this.ele = createSimpleQuizFormElement()

        $(this.ele).find("#question_text").text(quiz.Question)
        $(this.ele).find("#answer_text").text(quiz.Answer)
        $(this.ele).find("#quiz_answer_btn").one("click", () => {
            this.checkAnswer()
        })
    }

    setNextFunction(func) {
        this.nextfunc = func
    }

    checkAnswer() {
        let user_answer = $(this.ele).find("#answer_form").val()

        let resultele
        if (user_answer === this.quiz.Answer) {
            resultele = createSimpleQuizResultElementTrue()
            this.result = true
        } else {
            resultele = createSimpleQuizResultElementFalse()
            this.result = false
        }

        $(this.ele).find("#result").remove()
        $(this.ele).prepend(resultele)

        $(resultele).css("visibility", "visible")
        $(this.ele).find("#description").collapse("show")

        let btn = $(this.ele).find("#quiz_answer_btn")
        btn.text("Next")
        btn.on("click", this.nextfunc)
        $(resultele).find("#result_next_btn").on("click", this.nextfunc)
    }

    remove() {
        $(this.ele).remove()
    }
}