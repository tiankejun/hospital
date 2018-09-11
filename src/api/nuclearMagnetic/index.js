import axios from 'axios'
import fatch from '../fatch'
let testURL = '../../static'

/**
 * 获取字典数据
 * @param  {Object} param 数据筛选参数
 * @return {Object}       Promise
 */
export function GetDictionaryAPI (param) {
    return axios.post('/nmr//api/conds/all', param)
}

/**
 * 获取卡号列表
 * @param  {Object} param 数据筛选参数
 * @return {Object}       Promise
 */
export function getModelData (param) {
    return fatch.get('/static/testData/modelData.json', param)
}

/**
 * 获取列头
 * @param  {Object} param 数据筛选参数
 * @return {Object}       Promise
 */
export function getColName (param) {
    return axios.post('/nmr/api/args/columns', param)
}

/**
 * 获取数据
 * @param  {Object} param 数据筛选参数
 * @return {Object}       Promise
 */
export function getColData (param) {
    return axios.post('/nmr/api/args/vals', param)
}