import fatch from '../fatch'
let testURL = '../../static'

/**
 * 获取列表
 */
// export function getColName () {
//     return fatch.get(testURL + '/testData/colomn.json')
// }

let getModelData = function () {
    return fatch.get(testURL + '/testData/modelData.json')
}

let getColName = function (params) {
    return fatch.post('/nmr/api/args/columns', params)
}

let getColData = function (params) {
    return fatch.post('/nmr/api/args/vals', params)
}

let getDictionary = function (params) {
    return fatch.post('/nmr//api/conds/all', params)
}

export default {
    getModelData,
    getColName,
    getColData,
    getDictionary,
}