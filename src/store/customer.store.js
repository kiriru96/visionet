import {basic} from '../method'

export const customer = {
    namespaced: true,
    state: {
        listItems: [],
        totalitems: 0,
        error: null,
        loading: false,
        submit: false,
        dialog: false,
        msg: null,
        lightSeach: []
    },
    actions: {
        async reqList({commit}, {index, rows, search, sortby, sort}) {
            commit('removeError')
            commit('setLoading', true)

            let res = await basic.list('customer', {index: index, rows: rows, search: search, sortby: sortby, sort: sort})

            if(!res.err) {
                commit('addAll', {items: res.json.data.list, len: res.json.data.len})
            } else {
                commit('setError', res.err)
            }
            commit('setLoading', false)
        },
        async insertList({commit}, data) {
            commit('removeError')
            commit('setLoading', true)
            commit('setSubmit', true)

            let res = await basic.submit('customer', data)

            if(!res.err) {
                
            } else {
                commit('setError', res.err)
            }
            commit('setLoading', false)
        },
        async updateList({commit}, data) {
            commit('removeError')
            commit('setLoading', true)
            commit('setSubmit', true)

            let res = await basic.update('customer', data)

            if(!res.err) {
                
            } else {
                commit('setError', res.err)
            }
            commit('setLoading', false)
        },
        async deleteList({commit}, id) {
            commit('removeError')
            commit('setLoading', true)
            
            let res = await basic.del('customer', id)

            if(!res.err) {

            } else {
                commit('setError', res.err)
            }
        },
        openDialog({commit}) {
            commit('setDialog', true)
        },
        closeDialog({commit}) {
            commit('setDialog', false)
        },
        removeError({commit}) {
            commit('removeError')
        },
        removeError({commit}) {
            commit('removeError')
        },
        removeMsg({commit}) {
            commit('removeMessage')
        }
    },
    getters: {
        getAllItems(state) {
            return state.listItems
        },
        getLoading(state) {
            return state.loading
        },
        getLenItems(state) {
            return state.totalitems
        },
        getStatSubmit(state) {
            return state.submit
        },
        getError(state) {
            return state.error
        },
        getDialog(state) {
            return state.dialog
        },
        getMessage(state) {
            return state.msg
        }
    },
    mutations: {
        setLoading(state, status) {
            state.loading = status
        },
        setDialog(state, status) {
            state.dialog = status
        },
        setMessage(state, msg) {
            state.msg = msg
        },
        removeMessage(state) {
            if(state.msg) {
                state.msg = null
            }
        },
        setError(state, err) {
            state.error = err
        },
        removeError(state) {
            if(state.error) {
                state.error = null
            }
        },
        addAll(state, {items, len}) {
            state.listItems     = items
            state.totalitems    = len
        },
        setSubmit(state, stat) {
            state.submit = stat
        },
        clear(state) {
            state.listItems.length  = 0
            state.totalitems        = 0
        },
        addItem(state, item) {
            state.listItems.push(item)
        },
        updateItem(state, data) {
            state.listItems.find((item, index)=>{
                if(item.id === data.id) {
                    state.listItems[index] = data.item
                }
            })
        },
        deleteItem(state, id) {
            state.listItems.find((item, index)=> {
                if(item.id === id) {
                    delete state.listItems[index]
                }
            })
        }
    }
}