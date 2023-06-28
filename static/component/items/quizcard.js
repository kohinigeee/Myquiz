function htmlStrToElement(htmlStr) {
    const dummyDiv = document.createElement("div")
    dummyDiv.innerHTML = htmlStr;
    return dummyDiv.firstElementChild;
}

function createQuizCard(quiz) {
    const htmlStr = ` 
                <div class="row flex-grow-1 d-flex justify-content-center b-3">
                    <div class="col-12 my_question_flame mt-2 d-flex flex-column justify-content-end mybg-secondary">
                        <p class="question_id d-none">1</p>
                        <div class="mt-2 p-1 flex-grow-1 d-flex flex-column">

                            <div class="card flex-grow-1">
                                <div class="card-body pl-2 pr-1 pt-2 pb-2">
                                    <h5 class="pb-1 card-title d-inline mytext-primary" style="font-weight: bold;">Question
                                    </h5>
                                    <hr class="mt-1 mb-1">
                                    <textarea readonly class="card-text form-control-plaintext my_question_textarea question_text" rows="3"
                                        style="font-size: 100%;">「くらむぼん」、「雨にも負けず」、「銀河鉄道の夜」などで知られる宮沢賢治が作者であり、「因果交流」のようなワードが印象的である詩集のタイトルは？</textarea>
                                </div>
                            </div>

                            <div class="container-fluid">
                                <div class="row flex-grow-1">
                                    <div class="card mt-2 mb-2 col-8 d-flex flex-column justify-content-end">
                                        <div class="d-block card-body pl-1 pr-1 pt-1 pb-0">

                                            <h6 class="card-text mytext-primary" style="font-size: 120%; font-weight: bold;">Answer</h6>
                                            <hr class="mt-0 mb-0">
                                            <textarea readonly class="card-text form-control-plaintext my_question_textarea" rows="1">春と修羅</textarea>
                                        </div>
                                    </div>

                                    <div class="d-flex flex-fill justify-content-end" style="align-items: flex-end;">
                                        <button class="my_question_card_hensyu_btn mb-2 mybg-secondary hover_up_btn" style="border: outset white 2px; border-radius: 5px;">
                                            <img src="./static/img/hensyuu_ico.png">
                                        </button>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            `
    quizcard = htmlStrToElement(htmlStr)
    tmp = $(quizcard).find(".my_question_textarea")
    question_textarea = tmp.get(0)
    answer_textarea = tmp.get(1)

    $(question_textarea).text(quiz.question)
    $(answer_textarea).text(quiz.answer)
    $(quizcard).find(".question_id").text(quiz.id)

    return quizcard;
}

function autoResize(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + "px";
}

function hensyuBtnEvent(event) {
    ele = event.currentTarget

    question_flame = ele.closest(".my_question_flame")
    tmp = $(question_flame).find(".my_question_textarea")
    question_area = tmp.get(0)
    question_answer = tmp.get(1)

    $(question_area).prop("readonly", false)
    $(question_answer).prop("readonly", false)
    $(question_area).focus()

    len = question_area.value.length
    question_area.setSelectionRange(len, len)


    ele.innerHTML = "<img src=./static/img/update_ico.png>"

    clone = ele.cloneNode(true)
    $(clone).on("click", updateBtnEvent)
    ele.parentNode.replaceChild(clone, ele)

}

function updateBtnEvent(event) {
    ele = event.currentTarget

    question_flame = ele.closest(".my_question_flame")
    tmp = $(question_flame).find(".my_question_textarea")
    question_area = tmp.get(0)
    question_answer = tmp.get(1)

    $(question_area).prop("readonly", true)
    $(question_answer).prop("readonly", true)

    ele.innerHTML = "<img src=./static/img/hensyuu_ico.png>"

    clone = ele.cloneNode(true)
    $(clone).on("click", hensyuBtnEvent)
    ele.parentNode.replaceChild(clone, ele)
}

function quizCardsInit() {
    $(".my_question_textarea").each(function () {
        this.style.height = 'auto'
        this.style.height = this.scrollHeight + "px";
    })

    $(".my_question_textarea").on("input", function () {
        autoResize(this)
    })

    $(".my_question_answer").each(function () {
        this.style.height = 'auto'
        this.style.height = this.scrollHeight + "px";
    })

    $(".my_question_answer").on("input", function () {
        autoResize(this)
    })

    $(".my_question_card_hensyu_btn").on("click", hensyuBtnEvent)
}