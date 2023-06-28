class QuizTypes {

    //apiのgetquizOptionsのtype.nameToId要素を引数にとる
    constructor(quiztypes) {
        this.simpleTypeId = quiztypes.get("一問一答")
        this.opt4TypeId = quiztypes.get("四択問題")
        this.imgSimpleTypeId = quiztypes.get("画像付き一問一答")
        this.imgOpt4YypeId = quiztypes.get("画像付き四択問題")
    }
}