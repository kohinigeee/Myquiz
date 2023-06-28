console.log("[Log] TestPage")


$(document).ready( async function() {
    let tmp = await getQuizOptions("genre", "type")
    console.log(tmp)
})