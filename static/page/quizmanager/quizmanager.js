// function autoResize(textarea) {
//     textarea.style.height = 'auto';
//     textarea.style.height = textarea.scrollHeight + "px";
// }

// function hensyuBtnEvent(event) {
//     ele = event.currentTarget

//     question_flame = ele.closest(".my_question_flame")
//     tmp = $(question_flame).find(".my_question_textarea")
//     question_area = tmp.get(0)
//     question_answer = tmp.get(1)

//     $(question_area).prop("readonly", false)
//     $(question_answer).prop("readonly", false)
//     $(question_area).focus()

//     len = question_area.value.length
//     question_area.setSelectionRange(len, len)


//     ele.innerHTML = "<img src=./static/img/update_ico.png>"

//     clone = ele.cloneNode(true)
//     $(clone).on("click", updateBtnEvent)
//     ele.parentNode.replaceChild(clone, ele)

// }

// function updateBtnEvent(event) {
//     ele = event.currentTarget

//     question_flame = ele.closest(".my_question_flame")
//     tmp = $(question_flame).find(".my_question_textarea")
//     question_area = tmp.get(0)
//     question_answer = tmp.get(1)

//     $(question_area).prop("readonly", true)
//     $(question_answer).prop("readonly", true)

//     ele.innerHTML = "<img src=./static/img/hensyuu_ico.png>"

//     clone = ele.cloneNode(true)
//     $(clone).on("click", hensyuBtnEvent)
//     ele.parentNode.replaceChild(clone, ele)
// }


// $(document).ready(function () {
//     $(".my_question_textarea").each(function () {
//         this.style.height = 'auto'
//         this.style.height = this.scrollHeight + "px";
//         console.log(this)
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
// });

$(document).ready( function() {
    var quiz = { Id : 2, Question : "胎児の際にゼウスの股に縫い付けられ、そのまま生まれたとされる酒、狂気などを象徴するギリシア神話のオリュンポス12神のひとりに数えられる神の名前はなに?", Answer : "デュオソニス"}

    ele = createQuizCard(quiz)

    $("#contents").append(ele)

    quizCardsInit()
})