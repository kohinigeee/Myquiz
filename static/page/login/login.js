function login(event) {
    event.preventDefault();

    var form = event.target;
    var formData = new FormData(form);

    fetch(form.action, {
        method: form.method,
        body : new URLSearchParams(formData),
        headers: {
            "Content-Type" : "application/x-www-form-urlencoded"
        }
    }).then( response => {
        if ( response.ok ) {
            console.log("This is collect password")
            document.location.assign("/index");
        } else {
            window.alert("ログインに失敗しました")
        }
    }).catch( err => {
        console.log("Find error")
        console.error(err)
    })
}

$(document).ready(function(){
    var ele = document.querySelector("#loginform")
    console.log(ele)
    ele.addEventListener('submit', login)
}
)