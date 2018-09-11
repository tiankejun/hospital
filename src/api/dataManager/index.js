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

/**
 * 获取所有规格
 * @param  {Object} param 数据筛选参数
 * @return {Object}       Promise
 */
export function GetSpecsAPI (param) {
    return axios.post('/nmr/api/specs/getall', param)
}

/**
 * 查找所有厂商
 * @param  {Object} param 数据筛选参数
 * @return {Object}       Promise
 */
export function GetManusAPI (param) {
    return axios.post('/nmr/api/manus/getall', param)
}

/**
 * 厂家、规格、型号数据录入
 * @param  {Object} param 数据
 * @return {Object}       Promise
 */
export function SaveData (param) {
    return axios.post('/nmr/api/manuspecmodel/save', param)
}

/**
 * 文件上传接口
 * @param  {Object} param 上传
 * @return {Object}       Promise
 */
export function UploadImg (param) {
    return axios.post('/nmr/api/filesUpload', param)
}