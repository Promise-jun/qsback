import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

const state = {
    navList: [], //菜单列表
    userInfo: JSON.parse(localStorage.getItem('user_info')) || {} //用户信息
}

const mutations = {
    setNavList: (state, data) => {
        state.navList = data
    },
    setUserInfo: (state, data) => {
        state.userInfo = data
        localStorage.setItem('user_info', JSON.stringify(data))
    }
}

const actions = {
    // 获取该用户的登录信息
    getUserInfo({commit}) {
        return new Promise((resolve) => {
            axios({
                method: 'post',
                url: '/sys/public/getUserInfo'
            }).then(res => {
                let result = res.data
                if (result.code == 200) {
                    commit("setUserInfo", result.data)
                    resolve(result.data)
                } else {
                    console.log(result.msg)
                }
            })
        })
    },

    // 获取该用户的菜单列表
    getNavList({commit}){
        return new Promise((resolve) =>{
            axios({
                url: '/sys/public/getRoleAuth',
                method: 'post'
            }).then((res) => {
                // console.log(res.data.data)
                commit("setNavList", res.data.data)
                resolve(res.data.data)
            })
        })
    },

    // 将菜单列表扁平化形成权限列表
    getPermissionList({state}){
        return new Promise((resolve) =>{
            let permissionList = []
            // 将菜单数据扁平化为一级
            function flatNavList(arr){
                if (arr && arr.length) {
                    arr.forEach(v => {
                        if(v.child && v.child.length){
                            permissionList.push(v)
                            flatNavList(v.child)
                        } else{
                            permissionList.push(v)
                        }
                    })
                }  
            }
            flatNavList(state.navList)
            resolve(permissionList)
        })
    }
}

Vue.use(Vuex)

export default new Vuex.Store({
    state,
    mutations,
    actions
})