function autoResize(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + "px";
}

function submitBtnEventListner(event) {
    event.preventDefault()

    var form = document.querySelector("#new_quiz_form")
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