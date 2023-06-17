function autoResize(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + "px";
}

function getFormVal(id) {
    return $(id).val()
}

function submitBtnEventListner(event) {
    event.preventDefault()

    let question = getFormVal("#question")
    let answer = getFormVal("#answer")

    let isValid = true 
    if ( question === "" ) {
       $("#question_alert").removeClass("d-none")
       isValid = false 
    } else {
        $("#question_alert").addClass("d-none")
    }

    if ( answer === "" ) {
       $("#answer_alert").removeClass("d-none")
       isValid = false
    } else {
        $("#answer_alert").addClass("d-none")
    }
    if ( isValid === false ) return

    var form = document.querySelector("#new_quiz_form")
    var val = form.val 
    console.log(val)

    var formData = new FormData(form)

    fetch(form.action, {
        method : form.method,
        body : new URLSearchParams(formData),
        headers: {
            "Content-Type" : "application/x-www-form-urlencoded"
        }
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

$(document).ready(function() {
    $(".my_question_textarea").on("input", function () {
        autoResize(this)
    })

    $("#quiz_submit_btn").on("click", submitBtnEventListner)
})