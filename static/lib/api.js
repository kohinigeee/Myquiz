async function getQuizOptions(...tags) {
    let data = undefined

    if (tags.length <= 0) return ans

    let path = "/api/quizoptions?infotags="

    for (let tag of tags) {
        path += `${tag}+`
    }

    path = path.slice(0, -1);
    await fetch(path)
        .then(response => {
            if (!response.ok) {
                return
            }
            return response.json()
        })
        .then(tmpData => {
            data = tmpData
        })
        .catch(err => {
            console.error(err)
        })

    if (data === undefined) {
        return undefined
    }

    let ans = {}
    for (let tag in data) {
        let array = data[tag]
        array = array.sort((a,b)=> a.Id-b.Id)

        let idToName = new Map();
        let nameToId = new Map();
        for (let v of array) {
            idToName.set(v.Id, v.Name)
            nameToId.set(v.Name, v.Id)
        }
        ans[tag] = { "idToName" : idToName, "nameToId" : nameToId};
    }

    return ans
}
