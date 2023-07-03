class QuizTypes {

    //apiのgetquizOptionsのtype.nameToId要素を引数にとる
    constructor(quiztypes) {
        this.simpleTypeId = quiztypes.get("一問一答")
        this.opt4TypeId = quiztypes.get("四択問題")
        this.imgSimpleTypeId = quiztypes.get("画像付き一問一答")
        this.imgOpt4YypeId = quiztypes.get("画像付き四択問題")
    }
}

class QuizGenres {

    //apiのgequizOptionsのgenre.nameToId要素を引数にとる
    constructor(quizgenres) {
        this.scienceId = quizgenres.get("自然科学")
        this.literatureId = quizgenres.get("文学・語学・哲学")
        this.socialId = quizgenres.get("歴史・地理・社会") 
        this.musicId = quizgenres.get("音楽")
        this.sportsId = quizgenres.get("スポーツ")
        this.entertainmentId = quizgenres.get("芸能")
        this.lifestyleId = quizgenres.get("ライフスタイル")
        this.nongenreId = quizgenres.get("ノンジャンル")
        this.subcultureId = quizgenres.get("サブカルチャー")
    }
}

function convertToQuizMap(quizlist) {
    let mp = new Map();

    for ( let i = 0; i < quizlist.length; ++i ) {
        mp.set(quizlist[i].id, quizlist[i])
    }
    return mp
}