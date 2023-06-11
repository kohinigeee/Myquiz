const HOSTURL = "http://localhost:8080"

//nav_barのアイテムをurlに応じてアクティヴにする
function item_activate() {
   url = document.URL.replace(HOSTURL, "")
   console.log(url)

   $(".my_header_item").each(function() {
      var href = $(this).attr("href");
      if ( href == url ) {
         $(this).addClass("active")
         $(this).addClass("my_header_item_active")
         $(this).attr("href", "#")
      }
   })
}

$(document).ready( function() {
    $(".my_header_container").mouseenter(function() {
       $(".my_header_item_active").toggleClass("active")
    })

    $(".my_header_container").mouseleave(function() {
       $(".my_header_item_active").toggleClass("active")
    })

    fetch("/account")
    .then(response => response.json())
    .then( data=> {
      if ( data["Id"] == 0 ) {
         $("#header_nav_item_account_drop").css("display", "none")
         $("#mobile_nav_item_account_drop").css("display", "none")
         $(".not_allowed_guest").css("pointer-events", "none")
         $(".not_allowed_guest").css("opacity", "0.6")
      } else {
         $("#header_nav_item_login_btn").css("display", "none")
         $("#mobile_nav_item_login_btn").css("display", "none")
         $("#account_dropdown").text(data["Name"])
         $("#mobile_account_dropdown").text(data["Name"])
      }
    })
    .catch(error => {
      console.error(error)
    })

    item_activate()
})