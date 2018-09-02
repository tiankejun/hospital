/**
 * @file VUEX状态存储-日志命名空间
 * @auther Jake
 * @date 2017.10
 */

const state = {
    MenuList: [],
    ModelId: '',
}

const mutations = {
    UPDATE_MENULIST (state, value) {
        state.MenuList = value
    },
    UPDATE_MODELID (state, value) {
        state.ModelId = value
    },
}

const actions = {
    // 接受数组参数，替换内容
    update_menuList ({commit}, value) {
        commit('UPDATE_MENULIST', value)
    },
    update_modelid ({commit}, value) {
        commit('UPDATE_MODELID', value)
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
