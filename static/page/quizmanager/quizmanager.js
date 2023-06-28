async function getQuizList() {
  var ans = undefined
  await fetch("/api/quizmanage?genre=all")
    .then(response => {
      if (!response.ok) {
        return
      }
      return response.json()
    })
    .then(data => {
      ans = data
    })
    .catch(err => {
      console.error(err)
    })

  return ans
}


function push_card_torow(ele_row, quizcard) {
  const html_container = '<div class="pl-md-5 container col-md-6 col-lg-4 col-12 m-0"></div>'
  let container = htmlStrToElement(html_container)
  $(container).append(quizcard)
  $(ele_row).append(container)
}

function create_cards_display_row() {
  const html_row = '<div class="row cards_display_row mb-2 d-flex justify-content-start"></div>'
  let row = htmlStrToElement(html_row)
  return row
}

function adjust_row(row) {
  const textareas = row.getElementsByClassName("question_text")
  let max_height = 0
  for ( let i = 0; i < textareas.length; ++i ) {
    const height = textareas[i].scrollHeight
    max_height = max_height < height ? height : max_height
  }

  for ( let i = 0; i < textareas.length; ++i ) {
    textareas[i].style.height = max_height+"px"
  }
}

function adjust_rows() {
  const rows = document.getElementsByClassName("cards_display_row")

  $(rows).each( function(index, ele) {
    adjust_row(ele)
  })
}

function assing_cards(quizlist, max_cards_num_inrow) {
  var cnt = 0
  var row
  for (let i = 0; i < quizlist.length; ++i) {
    if (cnt == 0) {
      row = create_cards_display_row()
    }

    push_card_torow(row, createQuizCard(quizlist[i]))
    cnt += 1
    if (cnt === max_cards_num_inrow) {
      $("#cards_display").append(row)
      cnt = 0
    }
  }

  if (cnt > 0) {
    $("#cards_display").append(row)
  }


}

function addQuiz(quiz) {
  const contHtmlStr = '<div class="card_container animate__animated animate__fadeInUpBig container-fluid m-0 col-12 col-sm-6 col-xl-4 pl-md-5"></div>' 
  let cont = htmlStrToElement(contHtmlStr)

  $(cont).append(createQuizCard(quiz))
  $("#cards_display_row").append(cont)

  return cont
}

function addQuizList(quizlist, cardeles) {
  for ( let i = 0; i < quizlist.length; ++i ) {
    cardeles.push(addQuiz(quizlist[i]))
  }
}

function sleepms(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

$(document).ready(async function () {

  var quizlist = await getQuizList()
  console.log(quizlist)
  var cardeles = []

  addQuizList(quizlist, cardeles)
  
  for ( let i = 0; i < cardeles.length; ++i ) {
    const s = i*0.05
    const delay= `${s}s`
    $(cardeles[i]).css("animation-delay", delay)
  }

})