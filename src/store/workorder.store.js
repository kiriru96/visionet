import { assets } from "../method"

export const workorder = {
    namespaced: true,
    state: {
        listItems: [],
        totalitems: 0,
        loading: false,
        insert: false,
        update: false,
        dialog: false,
        errMsg: null,
        lightSearchLocation: [],
        lightSearchCustomer: [],
        loadingLocation: false,
        loadingCustomer: false
    },
    actions: {
        async reqList({commit, state}, {index, rows, search, sortby, sort}) {
            if(state.loading) return

            commit('removeError')
            commit('setLoading', true)

            let res = await assets.listWorkOrder({index: index, rows: rows, search: search, sortby: sortby, sort: sort})

            if(!res.err) {
                commit('setList', {items: res.json.data.list, len: res.json.data.len})
                commit('setUpdate', false)
            } else {
                commit('removeListItem')
                commit('setError', res.err)
            }
            commit('setLoading', false)
        },
        async updateWorkOrder({commit, state}, data) {
            if(state.loading) return

            commit('removeError')
            commit('setLoading', true)
            commit('setInsert', true)

            let res = await assets.updateWorkOrder(data)

            if(!res.err) {
                commit('setDialog', false)
                commit('setUpdate', true)
            } else {
                commit('setError', res.err)
            }

            commit('setLoading', false)
            commit('setInsert', false)
        },
        async deleteWorkOrder({commit, state}, data) {
            if(state.loading) return
            
            commit('removeError')
            commit('setLoading', true)
            
            let res = await assets.deleteWorkOrder(data)

            if(!res.err) {
                commit('setUpdate', true)
                commit('setError', res.json.msg)
            } else {
                commit('setError', res.err)
            }

            commit('setLoading', false)
        },
        async searchLocation({commit}, search) {
            if(search.trim().length >= 2) {
                commit('removeError')
                commit('setLoadingLocation', true)

                let result = await assets.searchLight('location', search)

                if(!result.err) {
                    commit('setListLightLocation', result.json.data.list)
                } else {
                    commit('setError', result.err)
                }
                commit('setLoadingLocation', false)
            }
        },
        async searchCustomer({commit}, search) {
            if(search.trim().length >= 2) {
                commit('removeError')
                commit('setLoadingCustomer', true)

                let result = await assets.searchLight('customer', search)

                if(!result.err) {
                    commit('setListLightCustomer', result.json.data.list)
                } else {
                    commit('serError', result.err)
                }
                commit('setLoadingCustomer', false)
            }
        },
        openDialog({commit}) {
            commit('setDialog', true)
        },
        closeDialog({commit}) {
            commit('setDialog', false)
        },
        removeDialog({commit}) {
            commit('removeError')
        }
    },
    getters: {
        getListLightLocation(state) {
            return state.lightSearchLocation
        },
        getListLightCustomer(state) {
            return state.lightSearchCustomer
        },
        getList(state) {
            return state.listItems
        },
        getTotalItems(state) {
            return state.totalitems
        },
        getDialog(state) {
            return state.dialog
        },
        getError(state) {
            return state.err
        },
        getLoading(state) {
            return state.loading
        },
        getInsert(state) {
            return state.insert
        },
        getLoadingCustomer(state) {
            return state.loadingCustomer
        },
        getLoadingLocation(state) {
            return state.loadingLocation
        },
        getUpdate(state) {
            return state.update
        }
    },
    mutations: {
        setUpdate(state, status) {
            state.update = status
        },
        setInsert(state, stat) {
            state.insert = stat
        },
        setListLightLocation(state, list) {
            state.lightSearchLocation = list
        },
        setListLightCustomer(state, list) {
            state.lightSearchCustomer = list
        },
        setLoadingLocation(state, stat) {
            state.loadingLocation = stat
        },
        setLoadingCustomer(state, stat) {
            state.loadingCustomer = stat
        },
        setLoading(state, stat) {
            state.loading = stat
        },
        setError(state, err) {
            state.err = err
        },
        removeError(state) {
            state.err = null
        },
        setList(state, {items, len}) {
            state.listItems = items
            state.totalitems = len
        },
        removeListItem(state) {
            state.listItems.length = 0
            state.totalitems = 0
        },
        setDialog(state, stat) {
            state.dialog = stat
        }
    }
}