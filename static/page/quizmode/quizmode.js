function autoResize(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + "px";
}

function htmlStrToElement(htmlStr) {
    const dummyDiv = document.createElement("div")
    dummyDiv.innerHTML = htmlStr;
    return dummyDiv.firstElementChild;
}

function myopen(event) {
    console.log("oepn func")
    $("#description").collapse("show")
    $("#result").css("visibility", "visible")
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

class GameManager {
    constructor(quizlist) {
        this.quizlist = quizlist
        this.nextindex = 0
        this.nowquizform = undefined
    }

    start() {
        this._setNextQuiz()
    }

    _setNextQuiz() {
        if ( this.nextindex >= this.quizlist.length ) {
            return
        }


        if ( this.nowquizform !== undefined ) this.nowquizform.remove()

        this.nowquizform = new SimpleQuiz(this.quizlist[this.nextindex])
        this.nextindex += 1

        $("#question_display").append(this.nowquizform.ele)

        if ( this.nextindex < this.quizlist.length ) {
            this.nowquizform.setNextFunction( ()=> {
                this._setNextQuiz()
            })
        } else {
            this.nowquizform.setNextFunction( ()=> {
            })
        }
    }
}


$(document).ready(async function () {
    quizlist = await getQuizList()

    gmanager = new GameManager(quizlist)
    console.log(gmanager.quizlist)

    gmanager.start()

})