function htmlStrToElement(htmlStr) {
    const dummyDiv = document.createElement("div")
    dummyDiv.innerHTML = htmlStr;
    return dummyDiv.firstElementChild;
}

function calcGenreColorClass( genre, genreId ) {
    switch(genreId) {
        case genre.scienceId:
            return "green_genre"
        case genre.literatureId:
            return "red_genre"
        case genre.socialId:
            return "brown_genre"
        case genre.musicId:
            return "purple_genre"
        case genre.subcultureId:
            return "pink_genre"
        case genre.sportsId:
            return "lightblue_genre"
        case genre.entertainmentId:
            return "lightyellow_genre"
        case genre.lifestyleId:
            return "lightgreen_genre"
        case genre.nongenreId:
            return "grey_genre"
    } 
    return undefined
}

function createSimpleQuizCard(simplequiz, genres) {
    const htmlStr = ` 
                <div class="row flex-grow-1 d-flex justify-content-center b-3">
                    <div class="col-12 my_question_flame mt-2 d-flex flex-column justify-content-end">
                        <p class="question_id d-none">1</p>
                        <div id="modal_div" class="mt-2 p-1 flex-grow-1 d-flex flex-column">

                            <div class="flex-grow-1 d-flex justify-content-end mb-2">
                            <button class="not_modal_trigger myclose-btn" onclick="this.blur()">
                                <img class="not_modal_trigger" src="./static/img/close_ico.svg" width="35" height="35">
                            </button>
                            </div>

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
                                        <button class="mb-2 border-0 nonactive_btn" style="background-color: inherit">
                                            <img src="./static/img/indetail_ico7.svg" hieght="25" width="30">
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

    $(question_textarea).text(simplequiz.question)
    $(answer_textarea).text(simplequiz.answer)
    $(quizcard).find(".question_id").text(simplequiz.id)
    console.log(simplequiz)
    $(quizcard).find(".my_question_flame").addClass(calcGenreColorClass(genres, simplequiz.genre))
    $(quizcard).find("#modal_div").on("click",(event)=>{
        if ( $(event.target).is(".not_modal_trigger") ) {
            return
        }
        console.log("question id=", $(quizcard).find(".question_id").text())
        $("#test-modal").modal("show")
    })

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

// function quizCardsInit() {
//     $(".my_question_textarea").each(function () {
//         this.style.height = 'auto'
//         this.style.height = this.scrollHeight + "px";
//     })

//     $(".my_question_textarea").on("input", function () {
//         autoResize(this)
//     })

//     $(".my_question_answer").each(function () {
//         this.style.height = 'auto'
//         this.style.height = this.scrollHeight + "px";
//     })

//     $(".my_question_answer").on("input", function () {
//         autoResize(this)
//     })

//     $(".my_question_card_hensyu_btn").on("click", hensyuBtnEvent)
// }