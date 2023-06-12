function htmlStrToElement(htmlStr) {
    const dummyDiv = document.createElement("div")
    dummyDiv.innerHTML = htmlStr;
    return dummyDiv.firstElementChild;
}

function createQuizCard(quiz) {
    const htmlStr = ` 
            <div class="container">
                <div class="row d-flex justify-content-center">
                    <div class="col-10 col-lg-8 my_question_flame mt-2 d-inline-block justify-content-center mybg-secondary">
                        <p class="quistion_id d-none">1</p>
                        <div class="mt-2 ml-2 mr-2">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title d-inline mytext-primary" style="font-weight: bold;">Question
                                    </h5>
                                    <!-- <img src="./static/img/question_ico.png"> -->
                                    <hr>
                                    <textarea readonly class="card-text form-control-plaintext my_question_textarea"
                                        style="font-size: 102%;">「くらむぼん」、「雨にも負けず」、「銀河鉄道の夜」などで知られる宮沢賢治が作者であり、「因果交流」のようなワードが印象的である詩集のタイトルは？</textarea>
                                </div>
                            </div>

                            <div class="container">
                                <div class="row">
                                    <div class="card mt-2 mb-2 mr-0 col-8">
                                        <div class="card-body pl-3 pt-1 pb-0">

                                            <h6 class="mytext-primary" style="font-size: 120%; font-weight: bold;">Answer</h6>
                                            <hr class="mt-1 mb-1">
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
            </div>
            `
    quizcard = htmlStrToElement(htmlStr)
    tmp = $(quizcard).find(".my_question_textarea")
    question_textarea = tmp.get(0)
    answer_textarea = tmp.get(1)

    $(question_textarea).text(quiz.Question)
    $(answer_textarea).text(quiz["Answer"])
    $(quizcard).find("question_id").text(quiz["Id"])

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
        console.log(this)
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