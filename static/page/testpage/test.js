console.log("[Log] TestPage")


$(document).ready( async function() {
    let tmp = await getQuizOptions("genre", "type")
    console.log(tmp)

    let array = [1,2,3,4,5,6,7]

    let sl = array.slice(1,100)
    sl[0] = 10
    console.log(sl)
    console.log(array)
})