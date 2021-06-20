import {manual} from '../method'

export const wo = {
    namespaced: true,
    state: {
        list: [],
        loading: false,
        err: null,
        detail: {
            woid: 0,
            assetid: 0,
            device: '',
            serial_number: '',
            customer: '',
            location: ''
        },
        dialog: false,
        lightSearchEngginer: []
    },
    actions: {
        async nextList({commit, state}, {date, page}) {
            if(state.loading) return

            commit('removeError')
            commit('setLoading', true)

            let res = await manual.listWorkOrder(date, page)
            
            if(!res.err) {
                commit('updateList', res.json.data.list)
            } else {
                commit('setError', res.err)
            }
            commit('setLoading', false)
        },
        async reqList({commit, state}, {date, page}) {
            if(state.loading) return
            commit('removeList')
            commit('removeError')
            commit('setLoading', true)

            let res = await manual.listWorkOrder(date, page)

            if(!res.err) {
                commit('setList', res.json.data.list)
            } else {
                commit('removeList')
                commit('setError', res.err)
            }
            commit('setLoading', false)
        },
        async nextListHistory({commit, state}, {date, page}) {
            if(state.loading) return
            
            commit('removeError')
            commit('setLoading', true)

            let res = await manual.listSubmitEngginer(date, page)
            
            if(!res.err) {
                commit('updateList', res.json.data.list)
            } else {
                commit('setError', res.err)
            }
            commit('setLoading', false)
        },
        async reqListHistory({commit, state}, {date, page, next}) {
            if(state.loading) return

            commit('removeList')
            commit('removeError')
            commit('setLoading', true)

            let res = await manual.listSubmitEngginer(date, page)

            if(!res.err) {
                if(next) {
                    commit('updateList', res.json.data.list)
                } else {
                    commit('setList', res.json.data.list)
                }
            } else {
                commit('removeList')
                commit('setError', res.err)
            }
            commit('setLoading', false)
        },
        async detailWorkOrder({commit}, id) {
            commit('removeError')
            commit('setLoading', true)

            let res = await manual.detailWO(id)

            if(!res.err) {
                commit('setDetail', res.json.data)
            } else {
                commit('removeList')
                commit('setError', res.err)
            }
            commit('setLoading', false)
        },
        async inputEngginer({commit}, data) {
            commit('removeError')
            commit('setLoading', true)

            let res = await manual.insertEngginerWO(data)

            if(!res.err) {
                
            } else {
                commit('setError', res.err)
            }
            commit('setLoading', false)
        },
        async searchEngginer({commit, state}, search) {
            if(state.loading) return
            
            commit('removeError')
            commit('setLoading', true)

            let res = await manual.lightSearchEngginer(search)

            if(!res.err) {
                commit('setListEngginer', res.json.data.list)
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
        }
    },
    getters: {
        getDialog(state) {
            return state.dialog
        },
        getLightSearchEngginer(state) {
            return state.lightSearchEngginer
        },
        getLoading(state) {
            return state.loading
        },
        getList(state) {
            return state.list
        },
        getError(state) {
            return state.err
        },
        getDetail(state) {
            return state.detail
        }
    },
    mutations: {
        setDialog(state, stat) {
            state.dialog = stat
        },
        setListEngginer(state, list) {
            state.lightSearchEngginer = list
        },
        setDetail(state, data) {
            state.detail = {
                woid: data.id,
                assetid: data.asset_id,
                device: data.devicename,
                serial_number: data.devicename,
                customer: data.customername,
                location: data.locationname
            }
        },
        updateList(state, list) {
            state.list = state.list.concat(list)
        },
        setList(state, list) {
            state.list = list
        },
        removeList(state) {
            state.list = []
        },
        setLoading(state, stat) {
            state.loading = stat
        },
        setError(state, err) {
            state.err = err
        },
        removeError(state) {
            state.err = null
        }
    }
}