$(document).ready( function() {
    $(".my_header_container").mouseenter(function() {
       $(".my_header_item_active").toggleClass("active")
    })

    $(".my_header_container").mouseleave(function() {
       $(".my_header_item_active").toggleClass("active")
    })
})