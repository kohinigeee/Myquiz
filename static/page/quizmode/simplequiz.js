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
                                    <div id="question_card" class="card-body pl-3 pr-1 pt-1 pb-1">
                                        <h4 class="pb-1 card-title d-inline mytext-primary" style="font-weight: bold;">
                                            Question
                                        </h4>
                                        <hr class="mt-1 mb-1">
                                    </div>
                                </div>

                                <div id="description" class="card mt-1 collapse">
                                    <div id="correct" class="card-body">
                                        <h5 class="pb-1 card-title d-inline mytext-primary" style="font-weight: bold;">
                                            Correct Answer
                                        </h5>
                                        <hr class="mt-1 mb-1">
                                        <p id="answer_text" class="card-text">正しい答え</p>
                                    </div>

                                    <div id="kaisetu" class="card-body pt-1">
                                        <h5 class="pb-1 card-title d-inline mytext-primary"
                                            style="font-weight: bold; font-size: 110%;">
                                            解説
                                        </h5>
                                        <hr class="mt-1 mb-1">
                                        <p id="commentary_text" class="card-text" style="font-size: 95%;">解説
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

function strToTypewriter(target, duration_sec, visible_sec) {
    const htmlStr = "<div></div>"
    div = htmlStrToElement(htmlStr)

    const start_delay = 0.5 

    for (let i = 0; i < target.length; ++i) {
        const spanhtml = `<span style="font-size:1.25rem; visibility: hidden;">${target[i]}<span>`
        const ele = htmlStrToElement(spanhtml)

        $(ele).css("animation", `fade-in ${visible_sec}s ease-in-out`)
        $(ele).on("animationend", function () {
            $(this).css("visibility", "visible")
        })

        const delay = i * duration_sec + start_delay
        const delays = `${delay}s`
        $(ele).css("animation-delay", delays)
        $(div).append(ele)
    }
    return div
}



//一問一答形式のクイズのクラス
class SimpleQuiz {

    constructor(quiz) {
        this.quiz = quiz
        this.nextfunc = undefined
        this.result = undefined
        this.userAnswer = undefined

        this.ele = createSimpleQuizFormElement()

        let question_text = strToTypewriter(quiz.question, 0.05, 0.03)

        $(this.ele).find("#question_card").append(question_text)
        $(this.ele).find("#answer_text").text(quiz.answer)

        const commentary = quiz.commentary
        if ( commentary !== "" ) {
            $(this.ele).find("#commentary_text").text(commentary)
        } else {
            $(this.ele).find("#commentary_text").text("解説はありません")
            $(this.ele).find("#commentary_text").css("opacity", 0.7)
        }
        $(this.ele).find("#quiz_answer_btn").one("click", () => {
            this.checkAnswer()
        })
    }

    setNextFunction(func) {
        this.nextfunc = func
    }

    compareAnswer(user_answer, answer) {
        return user_answer === answer
    }

    checkAnswer() {
        this.userAnswer = $(this.ele).find("#answer_form").val()
        this.result = this.compareAnswer(this.userAnswer, this.quiz.answer)

        let resultele
        if (this.result) {
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

//シンプルクイズのヒストリーカードの生成
//quizresult : SimpleQuiz class
function createSimpleQuizHistoryElement(quizresult, no) {

    const htmlStr = ` 
                            <div
                                class="my_question_history animate__animated animate__fadeInRight col-12 my_simple_question_history_flame mt-2 d-flex flex-column justify-content-end mybg-secondary">
                                <div class="mt-2 p-1 flex-grow-1 d-flex flex-column">
                                    <div id="card_top_info" class="d-flex justify-content-between mb-2">
                                        <p id="simple_quiz_history_no" class="mytext-secondary" style="font-size: 1.3rem; font-weight: bold;">No.1
                                        </p>
                                        <div id="false_result_info"
                                            class="d-none mybg-primary p-2 align-items-center result_top_info">
                                            <img src="./static/img/xmark_ico.svg" width="30" height="30">
                                            <p class="mytext-primary m-0 ml-1"
                                                style="font-size: 1.2rem; color: #1e4588">不正解</p>
                                        </div>

                                        <div id="true_result_info"
                                            class="d-none mybg-primary p-2 align-items-center result_top_info">
                                            <img src="./static/img/circle_ico.svg" width="30" height="30">
                                            <p class="mytext-primary m-0 ml-1" style="font-size: 1.2rem;">正解</p>
                                        </div>
                                    </div>

                                    <div class="card flex-grow-1">
                                        <div class="card-body pl-2 pr-1 pt-2 pb-2">
                                            <h5 class="pb-1 card-title d-inline mytext-primary"
                                                style="font-weight: bold;">
                                                Question
                                            </h5>
                                            <hr class="mt-1 mb-1">
                                            <p id="simple_quiz_history_question" class="card-text my_question_textarea"
                                                style="font-size: 100%;">
                                                「くらむぼん」、「雨にも負けず」、「銀河鉄道の夜」などで知られる宮沢賢治が作者であり、「因果交流」のようなワードが印象的である詩集のタイトルは？
                                            </p>
                                        </div>
                                    </div>

                                    <div class="container-fluid">
                                        <div class="row flex-grow-1 d-flex justify-content-between">
                                            <div class="card mt-2 mb-2 col-5 d-flex flex-column justify-content-end">
                                                <div class="d-block card-body pl-1 pr-1 pt-1 pb-0">

                                                    <h6 class="card-text mytext-primary"
                                                        style="font-size: 120%; font-weight: bold;">Answer</h6>
                                                    <hr class="mt-0 mb-0">
                                                    <p id="simple_quiz_history_answer" class="card-text form-control-plaintext my_question_textarea">
                                                        春と修羅
                                                    </p>
                                                </div>
                                            </div>

                                            <div
                                                class="ml-2 card mt-2 mb-2 col-6 d-flex flex-column justify-content-end">
                                                <div class="d-block card-body pl-1 pr-1 pt-1 pb-0">

                                                    <h6 class="card-text mytext-primary"
                                                        style="font-size: 120%; font-weight: bold;">Your Answer</h6>
                                                    <hr class="mt-0 mb-0">
                                                    <p id="simple_quiz_history_user_answer" class="card-text form-control-plaintext my_question_textarea">
                                                        春と修羅
                                                    </p>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                </div>
                            </div>`


    ele = htmlStrToElement(htmlStr)

    $(ele).find("#simple_quiz_history_no").text(`No.${no}`)
    $(ele).find("#simple_quiz_history_question").text(quizresult.quiz.question)
    $(ele).find("#simple_quiz_history_answer").text(quizresult.quiz.answer)
    $(ele).find("#simple_quiz_history_user_answer").text(quizresult.userAnswer)
    if (quizresult.result === true) {
        $(ele).find("#true_result_info").removeClass("d-none")
        $(ele).find("#true_result_info").addClass("d-flex")
    } else {
        $(ele).find("#false_result_info").removeClass("d-none")
        $(ele).find("#false_result_info").addClass("d-flex")
    }

    return ele
}
