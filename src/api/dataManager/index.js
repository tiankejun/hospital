import axios from 'axios'
import fatch from '../fatch'
let testURL = '../../static'

/**
 * 获取字典数据
 * @param  {Object} param 数据筛选参数
 * @return {Object}       Promise
 */
export function GetDatalistAPI (param) {
    return axios.post('/nmr/api/modelds/getpageList', param)
}

/**
 * 添加数据
 * @param  {Object} param 数据筛选参数
 * @return {Object}       Promise
 */
export function AddDataAPI (param) {
    return axios.post('/nmr/api/records/args/add', param)
}

/**
 * 编辑数据
 * @param  {Object} param 数据筛选参数
 * @return {Object}       Promise
 */
export function EditorDataAPI (param) {
    return axios.post('/nmr/api/records/args/addoredit', param)
}