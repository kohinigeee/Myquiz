function autoResize(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + "px";
}

function htmlStrToElement(htmlStr) {
    const dummyDiv = document.createElement("div")
    dummyDiv.innerHTML = htmlStr;
    return dummyDiv.firstElementChild;
}

function sleepms(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

//countupさせるテキストにタイマーをつける
//textをもっていること前提
async function doCountUp(ele, timems) {
    const count = parseInt($(ele).text())
    const duration = timems / count

    for (let i = 0; i < count; ++i) {
        let str = i.toString()

        $(ele).text(str+"%")
        await sleepms(duration)
    }

    $(ele).text(count.toString()+"%")
}


async function getQuizList() {
    var ans = undefined
    await fetch("/api/quizmanage?genre=all")
        .then(response => {
            if (!response.ok) {
                return
            }
            return response.json()
        })
        .then(data => {
            ans = data
        })
        .catch(err => {
            console.error(err)
        })

    return ans
}

class QuestionResult {
    constructor( quiz, result, userAnswer) {
        this.quiz = quiz
        this.result = result
        this.userAnswer = userAnswer
    }
}

//クイズゲームのマネージャクラス
class GameManager {
    constructor(quizlist) {
        this.quizlist = quizlist
        this.nextindex = 0
        this.nowquizform = undefined
        this.resultform = undefined
        this.results = []
    }

    start() {
        this._setNextQuiz()
    }

    _setResultPage() {
        $("#question_display").remove()
        let ele = createResulePageEle(this.results)
        $("#content_row").append(ele)
    }

    _setNextQuiz() {
        if ( this.nextindex >= this.quizlist.length ) {
            return
        }


        if ( this.nowquizform !== undefined ) this.nowquizform.remove()

        this.nowquizform = new SimpleQuiz(this.quizlist[this.nextindex])
        this.nextindex += 1

        $("#question_display").append(this.nowquizform.ele)
        $("#quiz_count").text(`(${this.nextindex}/${this.quizlist.length})`)

        if ( this.nextindex < this.quizlist.length ) { //問題が残っているとき
            this.nowquizform.setNextFunction( ()=> {

                let userAnswer = this.nowquizform.userAnswer
                let result = this.nowquizform.result
                let quiz = this.nowquizform.quiz

                this.results.push(new QuestionResult( quiz, result, userAnswer))
                this._setNextQuiz()
            })
        } else { //全ての問題を回答した際の挙動を設定
            this.nowquizform.setNextFunction( ()=> {

                let userAnswer = this.nowquizform.userAnswer
                let result = this.nowquizform.result
                let quiz = this.nowquizform.quiz

                this.results.push(new QuestionResult( quiz, result, userAnswer))
                this._setResultPage()
                let seitourituEle = $("#seitouritu_value").get(0)
                console.log(seitourituEle)
                doCountUp(seitourituEle, 1000)
            })
        }
    }
}

//クイズのヒストリーカードの生成
//後からクイズの種類によって分岐よてい
function createQuizHistoryElement( quizresult, no ) {
    return createSimpleQuizHistoryElement(quizresult, no)
}

function createResulePageEle( quizresults ) {
    const htmlStr = `
                <div id="result_container" class="container-fluid col-12 p-0 col-lg-6 d-flex flex-column">
                    <div id="result_info_container" class="">
                        <div id="seitouritu" class="d-flex justify-content-center align-items-end mb-3">
                            <p class="pb-2 mr-4 mytext-secondary" style="font-size: 1.5rem; font-weight: bold;">正答率</p>
                            <p id="seitouritu_value" class="mytext-secondary"
                                style="border-bottom: 3px solid white; font-size: 3rem; font-weight: bold;" class="">75
                            </p>
                        </div>
                        <p class="mytext-secondary text-center">セット名</p>
                        <p class="mytext-secondary text-center">制作者</p>
                    </div>

                    <div id="history_container" class="container mt-5">
                        <h3 class="mytext-primary" style="font-weight: bold;">Results</h3>
                        <hr class="mt-0 mb-0">
                    </div>
                </div>`

    let ele = htmlStrToElement(htmlStr)
    
    let trueCnt = 0
    for ( let i = 0; i < quizresults.length; ++i ) {
        if ( quizresults[i].result === true ) ++trueCnt;
    }
    let seitouritu = trueCnt*100/quizresults.length
    $(ele).find("#seitouritu_value").text(`${seitouritu}`)

    for ( let i = 0; i < quizresults.length; ++i ) {
        let historyEle = createQuizHistoryElement(quizresults[i], i+1)
        $(ele).find("#history_container").append(historyEle)
    }

    let eles = $(ele).find(".my_question_history")
    for ( let i = 0; i < eles.length; ++i ) {
        const delay = i*0.15
        const delays = `${delay}s`
        $(eles[i]).css("animation-delay", delays)
    }

    return ele
}


$(document).ready(async function () {
    quizlist = await getQuizList()

    gmanager = new GameManager(quizlist)
    gmanager.start()

})