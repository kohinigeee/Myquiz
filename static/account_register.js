
function createAccount(event) {
    event.preventDefault();

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
            window.alert("アカウント登録が完了しました")
        } else {
            window.alert("アカウント登録に失敗しました\nこのユーザーIDは既に利用されています。")
        }
    }).catch( err => {
        console.log(err)
    })
}

$(document).ready(function(){
    var ele = document.querySelector('#accountform');
    console.log(ele)
    ele.addEventListener('submit', createAccount);
})