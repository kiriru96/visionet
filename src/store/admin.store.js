import { account } from "../method"

export const admin = {
    namespaced: true,
    state: {
        listItems: [],
        totalitems: 0,
        error: null,
        loading: false,
        submit: false,
        dialog: false,
        update: false,
        msg: null
    },
    actions: {
        async reqList({commit, state}, {index, rows, search, sortby, sort}) {
            if(state.loading) return

            commit('removeError')
            commit('setLoading', true)

            let res = await account.list('admin', {index: index, rows: rows, search: search, sortby: sortby, sort: sort})

            if(!res.err) {
                commit('addAll', {items: res.json.data.list, len: res.json.data.len})
                commit('setUpdate', false)
            } else {
                commit('clear')
                commit('setError', res.err)
            }
            commit('setLoading', false)
        },
        async insertList({commit, state}, data) {
            if(state.loading) return

            commit('removeError')
            commit('setLoading', true)
            commit('setSubmit', true)

            let res = await account.submit('admin', data)

            if(!res.err) {
                commit('setDIalog', false)
                commit('setUpdate', true)
            } else {
                commit('setError', res.err)
            }
            commit('setLoading', false)
        },
        async updateList({commit, state}, data) {
            if(state.loading) return

            commit('removeError')
            commit('setLoading', true)
            commit('setSubmit', true)

            let res = await account.update('admin', data)

            if(!res.err) {
                commit('setDIalog', false)
                commit('setUpdate', true)
            } else {
                commit('setError', res.err)
            }
            commit('setLoading', false)
        },
        async deleteList({commit, state}, id) {
            if(state.loading) return

            commit('removeError')
            commit('setLoading', true)
            
            let res = await account.del('admin', id)

            if(!res.err) {
                commit('setUpdate', true)
            } else {
                commit('setError', res.err)
            }
            commit('setLoading', false)
        },
        async updatePassword({commit, state}, data) {
            if(state.loading) return
            
            commit('removeError')
            commit('setLoading', true)
            
            let res = await account.updatePassword('admin', data)

            if(!res.err) {

            } else {
                commit('setError', res.err)
            }
            commit('setLoading', false)
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
        getUpdate(state) {
            return state.update
        },
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
        },
        getLightLocationList(state) {
            return state.lightSearch
        }
    },
    mutations: {
        setUpdate(state, status) {
            state.update = status
        },
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
        setLightLocation(state, list) {
            state.lightSeach = list
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