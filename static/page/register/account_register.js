
function createAccount(event) {
    event.preventDefault();

    if ( !isSamePass() ) return;

    var form = event.target
    var formData = new FormData(form);

    fetch(form.action, {
        method: form.method,
        body : new URLSearchParams(formData),
        headers: {
            "Cotent-Type" : "application/x-www-form-urlencoded"
        }
    }).then( response => {
        if ( response.ok ) {
            document.location.assign("/index")
            window.alert("アカウント登録が完了しました")
        } else {
            window.alert("アカウント登録に失敗しました\nこのユーザーIDは既に利用されています。")
        }
    }).catch( err => {
        console.log(err)
    })

}

function isSamePass() {
    var pass1 = $("#password").val();
    var pass2 = $("#password_confirm").val();
    return pass1 == pass2;
}

function confirmPass() {

    var result = isSamePass()

    ele = $("#confirm_notion")
    if ( result ) {
        ele.text("パスワードが一致しています")
        ele.css("color", "black")
        $("#confirm_notion_ico").hide()
    } else {
        ele.css("color", "#b94047")
        $("#confirm_notion").text("パスワードが一致していません")
        $("#confirm_notion_ico").show()
    }
}

$(document).ready(function(){
    var ele = document.querySelector('#accountform');
    ele.addEventListener('submit', createAccount);

    $("#password_confirm").on("keyup", confirmPass)
})