function autoResize(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + "px";
}

function htmlStrToElement(htmlStr) {
    const dummyDiv = document.createElement("div")
    dummyDiv.innerHTML = htmlStr;
    return dummyDiv.firstElementChild;
}

//指定のidのフォームの値の取得関数
function getFormVal(id) {
    return $(id).val()
}

//クイズタイプの値をの取得関数
function getTypeVal() {
    return parseInt($("#quiz_type_select").val())
}

//クイズジャンルの値の取得関数
function getGenreVal() {
    return parseInt($("#quiz_genre_select").val())
}

let options
let types

//オプションのセット関数
function setOptions( options ) {
    const typeSelect = $("#quiz_type_select").get(0)
    for ( const [id, name] of options.type.idToName ) {
        const strHtml = `<option value=${id}>${name}</option>`
        $(typeSelect).append(htmlStrToElement(strHtml))
    }
    $(typeSelect).on("input", quizTypeEvent)

    const genreSelect = $("#quiz_genre_select").get(0)
    for ( const [id, name] of options.genre.idToName ) {
        const strHtml = `<option value=${id}>${name}</option>`
        $(genreSelect).append(htmlStrToElement(strHtml))
    }
}

//クイズタイプを変更した際のイベント
function quizTypeEvent(event) {
    const exform = $("#create_question_form").get(0)
    if ( exform !== undefined ) {
        $(exform).remove()
    }

    const ele = event.target
    const typeVal = parseInt($(ele).val())

    switch (typeVal) {
        case types.simpleTypeId:
            setSimpleQuizForm()
    }
}

$(document).ready(async function() {
    options = await getQuizOptions("type", "genre")
    types = new QuizTypes(options.type.nameToId)

    setOptions(options)
    $("#quiz_type_select").trigger("input")
})

//一問一答形式のフォームのセット
function setSimpleQuizForm() {
    let ele = createSimpleQuizFlame()
    $("#content-title").after(ele)
    $("#quiz_submit_btn").off("click")
    $("#quiz_submit_btn").on("click", simpleQuizSubmitBtnEventListner)
    $(".my_simple_question_textarea").on("input", function() {
        autoResize(this)
    })
}

//一問一答タイプの入力フォームの形成関数
function createSimpleQuizFlame() {
    const strHtml = `
                        <div class="animate__animated animate__flipInX col-12 my_simple_question_flame pb-2 pt-2 d-flex flex-column justify-content-center
                        mybg-secondary">
                            <div class="mt-2 p-0">
                                <div class="card">
                                    <div class="card-body pl-2 pr-1 pt-1 pb-1">
                                        <h5 class="pb-1 card-title d-inline mytext-primary" style="font-weight: bold;">
                                            Question
                                        </h5>
                                        <hr class="mt-1 mb-1">
                                        <textarea id="question" name="question"
                                            class="card-text form-control-plaintext my_simple_question_textarea"
                                            placeholder="問題分を入力してください" required></textarea>
                                        <div id="question_alert" class="invisible">
                                            <img src="./static/img/alert_ico.png" alt="アラート">
                                            <small class="mytext-primary">問題文の入力は必須です</small>
                                        </div>
                                    </div>
                                </div>

                                <div class="container">
                                    <div class="row">
                                        <div class="card pl-2 mt-2 mb-2 col-8">
                                            <div class="card-body pl-2 pr-1 pt-1 pb-0">

                                                <h6 class="card-text mytext-primary"
                                                    style="font-size: 120%; font-weight: bold;">Answer</h6>
                                                <hr class="mt-1 mb-1">
                                                <textarea id="answer" name="answer"
                                                    class="card-text form-control-plaintext my_simple_question_textarea"
                                                    rows="1" placeholder="答えを入力してください" required></textarea>
                                                <div id="answer_alert" class="invisible">
                                                    <img src="./static/img/alert_ico.png" alt="アラート">
                                                    <small class="mytext-primary">答えの入力は必須です</small>
                                                </div>

                                            </div>
                                        </div>

                                    </div>
                                </div>
                                
                                <hr>
                                <div class="card mt-3">
                                    <div class="card-body pl-2 pr-1 pt-1 pb-1">
                                        <h6 class="pb-1 card-title d-inline mytext-primary" style="font-weight: bold;">
                                           Commentary 
                                        </h5>
                                        <hr class="mt-1 mb-1">
                                        <textarea id="commentary"
                                            class="card-text form-control-plaintext my_simple_question_textarea"
                                            placeholder="解説文を入力してください(非必須)" rows="1"></textarea>
                                    </div>
                                </div>

                            </div>
                        </div>`


    const ele = htmlStrToElement(strHtml)
    $(ele).find(".my_question_textarea").on("input", function () {
        autoResize(this)
    })
    $(ele).attr("id", "create_question_form")
    return ele
}

function simpleQuizSubmitBtnEventListner(event) {
    event.preventDefault()

    const question = getFormVal("#question")
    const answer = getFormVal("#answer")
    const commentary = getFormVal("#commentary")
    const typeVal = getTypeVal()
    const genreVal = getGenreVal()
    
    
    const quizParams = {
        question: question,
        answer : answer,
        commentary : commentary,
        type : typeVal,
        genre : genreVal
    };

    let isValid = true 
    if ( question === "" ) {
       $("#question_alert").removeClass("invisible")
       isValid = false 
    } else {
        $("#question_alert").addClass("invisible")
    }

    if ( answer === "" ) {
       $("#answer_alert").removeClass("invisible")
       isValid = false
    } else {
        $("#answer_alert").addClass("invisible")
    }
    if ( isValid === false ) return

    var form = document.querySelector("#new_quiz_form")

    console.log(quizParams)

    fetch(form.action, {
        method : form.method,
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(quizParams)
    }).then( response => {
        if ( response.ok ) {
            window.alert("クイズを追加しました")
        } else {
            window.alert("クイズの追加に失敗しました")
        }
    }).catch( err => {
        console.error(err)
    })
}
