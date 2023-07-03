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

//quiz_typeによって分岐 types : QuizTypes
function createQuizCard(quiz, types, genres) {
  const typev = quiz.type
  switch (typev) {
    case types.simpleTypeId:
      return createSimpleQuizCard(quiz, genres)
  }
  return undefined
}

function addQuiz(quiz, types, genres) {
  const contHtmlStr = '<div class="card_container animate__animated animate__fadeInUpBig container-fluid m-0 col-12 col-sm-6 col-xl-4 pl-md-4 pr-md-4 mb-2 mt-2"></div>'
  let cont = htmlStrToElement(contHtmlStr)

  $(cont).append(createQuizCard(quiz, types, genres))
  $("#cards_display_row").append(cont)

  return cont
}

//quizlistは設定するクイズの情報の配列
function addQuizList(quizmap, ords, cardeles, types, genres) {
  for (let i = 0; i < ords.length; ++i) {
    cardeles.push(addQuiz(quizmap.get(ords[i]), types, genres))
  }

  for (let i = 0; i < cardeles.length; ++i) {
    const s = i * 0.05
    const delay = `${s}s`
    $(cardeles[i]).css("animation-delay", delay)
  }
}

function removeQuizList() {
  $("#cards_display_row").children().remove()
}

function sleepms(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

class QuizManager {
  constructor(quizlist, typeIds, genreIds) {
    this.quizMap = convertToQuizMap(quizlist)
    this.typeIds = typeIds
    this.genreIds = genreIds
    this.ords = [] //絞り込まれているカードのインデックスの配列
    this.showords = [] //配置するカードのインデックスの配列
    this.cardeles = []
    this.pageLimitCards = undefined
    this.nowPageIndex = undefined
    this.maxPageIndex = undefined
    this.pageWidth = 5 //paginationに表示するページ数の幅

    for (let [id, quiz] of this.quizMap) {
      this.ords.push(id)
    }

    this._setPageLImitCards(30)
    this.changePageIndex(0)
    this._setPageinationActions()
  }

  _setPageLImitCards(limt) {
    if (limt <= 0) return null
    this.pageLimitCards = limt
    this._calsMaxPageIndex()
  }

  _calsMaxPageIndex() {
    this.maxPageIndex = Math.ceil(this.ords.length / this.pageLimitCards)
  }

  _makeShowOrds() {
    const lidx = this.nowPageIndex * this.pageLimitCards
    this.showords = this.ords.slice(lidx, lidx + this.pageLimitCards)
  }

  _setPaginationValues() {
    $(".page_nowidx").find("a").text(this.nowPageIndex + 1)

    //表示・非表示の切り替え関数

    let l = this.nowPageIndex + 1
    let r = this.nowPageIndex + 1
    let cnt = 1

    if (this.maxPageIndex < this.pageWidth) {
      l = 1
      r = this.maxPageIndex
    } else {
      while (cnt < this.pageWidth) {
        if (l - 1 > 0) {
          l -= 1
          cnt += 1
        }
        if (cnt >= this.pageWidth) break
        if (r + 1 <= this.maxPageIndex) {
          r += 1
          cnt += 1
        }
      }
    }

    const switchFunc = function (ele, l, r) {
      let val = parseInt($(ele).find("a").text())

      if (val >= l && val <= r) {
        $(ele).addClass("d-md-inline")
      } else {
        $(ele).removeClass("d-md-inline")
      }
    }

    //値と表示の設定
    for (let i = 1; i < this.pageWidth; ++i) {
      const name = `.page_prev${i}`
      $(name).find("a").text(this.nowPageIndex - i + 1)
      switchFunc(name, l, r)

      const name2 = `.page_next${i}`
      $(name2).find("a").text(this.nowPageIndex + 1 + i)
      switchFunc(name2, l, r)
    }

    if ( this.nowPageIndex === 0 ) {
      $(".page_back").addClass("disabled")
    } else {
      $(".page_back").removeClass("disabled")
    }
    if ( this.nowPageIndex === this.maxPageIndex-1 ) {
      $(".page_next").addClass("disabled")
    } else {
      $(".page_next").removeClass("disabled")
    }
  }

  _setPageinationActions() {
    let self = this

    $(".page-item").on("click", function(event) {
      const ele = event.currentTarget
      const link = $(ele).find(".page-link").get(0)
      link.blur()
    })

    const pageClickEvent = function (event) {
      const ele = event.currentTarget
      const val = parseInt($(ele).find("a").text())
      self.changePageIndex(val - 1)
    }

    $(".page_nowidx").on("click", pageClickEvent)
    for (let i = 1; i < this.pageWidth; ++i) {
      const name = `.page_prev${i}`
      $(name).on("click", pageClickEvent)

      const name2 = `.page_next${i}`
      $(name2).on("click", pageClickEvent)
    }

    $(".page_begin").on("click", (event) => {
      self.changePageIndex(0)
    })
    $(".page_back").on("click", () => {
      self.changePageIndex(self.nowPageIndex-1)
    })
    $(".page_next").on("click", () => {
      self.changePageIndex(self.nowPageIndex+1)
    })
    $(".page_last").on("click", () => {
      self.changePageIndex(self.maxPageIndex-1)
    })
  }

  changePageIndex(idx) {
    if (idx < 0 || idx >= this.maxPageIndex) return null
    this.nowPageIndex = idx
    this._makeShowOrds()
    this._setCards()
    this._setPaginationValues()
  }

  _setCards() {
    this._removeQuizEles()
    addQuizList(this.quizMap, this.showords, this.cardeles, this.typeIds, this.genreIds)
  }

  _removeQuizEles() {
    for (let ele of this.cardeles) {
      $(ele).remove()
    }
    while (this.cardeles.length > 0) {
      this.cardeles.pop()
    }
  }

}

$(document).ready(async function () {
  const options = await getQuizOptions("type", "genre")
  const typeIds = new QuizTypes(options.type.nameToId)
  const genreIds = new QuizGenres(options.genre.nameToId)

  var quizlist = await getQuizList()

  let manager = new QuizManager(quizlist, typeIds, genreIds)
})