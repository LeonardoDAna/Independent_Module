import vue from 'vue'
import vuex from 'vuex'
vue.use(vuex)

import subject from './modules/subject'

export default new vuex.Store({
    modules: {
        subject
    },
    state: {
        shopList: [],
        opened: sessionStorage.getItem('opened') ? sessionStorage.getItem('opened') : true
    },
    getters: {
        shopcount(state) {
            console.log(state.shopList)
            if (state.shopList.length < 1) {
                return 0
            } else return state.shopList.length
        }
    },
    mutations: {
        add_shoplist(state, item) {
            //some() 方法会依次执行数组的每个元素;若有元素满足条件的就返回 true 没有就返回false
            if (state.shopList.some(r => r.id === item.id)) return
            state.shopList.push(item)
        },
        updataopenedStatus: (state, flag) => {
            state.opened = flag
            sessionStorage.setItem('opened', JSON.stringify(state.opened))
            console.log(state.opened)
        },
    }
})