/**
 * @file VUEX状态存储-日志命名空间
 * @auther Jake
 * @date 2017.10
 */

const state = {
    BaseUrl: '', // 暂未使用
    MenuList: [],
    Dictionary: [],
    SpecsData: [],
    ManusData: [],
}

const mutations = {
    UPDATE_MENULIST (state, value) {
        state.MenuList = value
    },
    UPDATE_DICTIONARY (state, value) {
        state.Dictionary = value
    },
    UPDATE_SPECSDATA (state, value) {
        state.SpecsData = value
    },
    UPDATE_MANUSDATA (state, value) {
        state.ManusData = value
    },
    UPDATE_BASEURL (state, value) {
        state.BaseUrl = value
    },
}

const actions = {
    // 接受数组参数，替换内容
    update_menuList ({commit}, value) {
        commit('UPDATE_MENULIST', value)
    },
    update_dictionary ({commit}, value) {
        commit('UPDATE_DICTIONARY', value)
    },
    update_specsdata ({commit}, value) {
        commit('UPDATE_SPECSDATA', value)
    },
    update_manusdata ({commit}, value) {
        commit('UPDATE_MANUSDATA', value)
    },
    update_baseurl ({commit}, value) {
        commit('UPDATE_BASEURL', value)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
