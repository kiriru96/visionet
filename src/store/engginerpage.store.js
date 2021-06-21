import {manual} from '../method'

export const engginerpage = {
    namespaced: true,
    state: {
        list: [],
        loading: false,
        loading_list_progress: false,
        loading_list_close: false,
        err: null,
        detail: {
            woid: 0,
            assetid: 0,
            device: '',
            serial_number: '',
            customer: '',
            location: ''
        },
        engginer_submit_id: 0,
        dialog: false,
        list_progress: [],
        list_close: [],
        lightSearchEngginer: [],
        date_wo: new Date().toISOString().substr(0, 10),
        date_history: new Date().toISOString().substr(0, 10),
        pic_list: [],
        desc_list: []
    },
    actions: {
        async nextList({commit, state}, {date, page}) {
            if(state.loading) return

            commit('removeError')
            commit('setLoading', true)

            let res = await manual.listWorkOrderEngginer(date, page)
            
            if(!res.err) {
                commit('updateList', res.json.data.list)
            } else {
                commit('setError', res.err)
            }
            commit('setLoading', false)
        },
        async nextListProgress({commit, state}, {date, page}) {
            if(state.loading_list_progress) return

            commit('removeError')
            commit('setLoadingListProgress', true)

            let res = await manual.listProgressWorkOrder(date, page)
            
            if(!res.err) {
                commit('updateListProgress', res.json.data.list)
            } else {
                commit('setError', res.err)
            }
            commit('setLoading', false)
        },
        async nextListClose({commit, state}, {date, page}) {
            if(state.loading_list_close) return

            commit('removeError')
            commit('setLoadingListClose', true)

            let res = await manual.listCloseWorkOrder(date, page)
            
            if(!res.err) {
                commit('updateListClose', res.json.data.list)
            } else {
                commit('setError', res.err)
            }
            commit('setLoadingListClose', false)
        },
        async reqListProgress({commit, state}, {date, page}) {
            if(state.loading_list_progress) return

            commit('removeError')
            commit('setLoadingListProgress', true)

            let res = await manual.listProgressWorkOrder(date, page)
            
            if(!res.err) {
                commit('setListProgress', res.json.data.list)
            } else {
                commit('removeListProgress')
                commit('setError', res.err)
            }
            commit('setLoadingListProgress', false)
        },
        async reqListClose({commit, state}, {date, page}) {
            if(state.loading_list_close) return

            commit('removeError')
            commit('setLoadingListClose', true)

            let res = await manual.listCloseWorkOrder(date, page)

            if(!res.err) {
                commit('setListClose', res.json.data.list)
            } else {
                commit('removeListClose')
                commit('setError', res.err)
            }
            commit('setLoadingListClose', false)
        },
        async reqList({commit, state}, {date, page}) {
            if(state.loading) return

            commit('removeError')
            commit('setLoading', true)

            let res = await manual.listWorkOrderEngginer(date, page)

            if(!res.err) {
                commit('setList', res.json.data.list)
            } else {
                commit('removeList')
                commit('setError', res.err)
            }
            commit('setLoading', false)
        },
        async detailWorkOrder({commit, state}, id) {
            if(state.loading) return

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
        async inputWO({commit, state}, data) {
            if(state.loading) return

            commit('removeError')
            commit('setLoading', true)

            let res = await manual.insertWO(data)

            if(!res.err) {
                commit('setError', 'Berhasil mengirim.')
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
        async confirmWO({commit, state}, data) {
            if(state.loading) return

            commit('removeError')
            commit('setLoading', true)

            let res = await manual.confirmWO(data)

            if(!res.err) {
                commit('setError', 'Berhasil mengirim.')
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
        removeListProgress({commit}) {
            commit('removeListProgress')
        },
        removeListClose({commit}) {
            commit('removeListClose')
        },
        updateDateHistory({commit}, date) {
            commit('setDateHistory', date)
        },
        updateDateWO({commit}, date) {
            commit('setDateWO', date)
        }
    },
    getters: {
        getDateHistory(state) {
            return state.date_history
        },
        getDateWO(state) {
            return state.date_wo
        },
        getDialog(state) {
            return state.dialog
        },
        getLightSearchEngginer(state) {
            return state.lightSearchEngginer
        },
        getLoading(state) {
            return state.loading
        },
        getLoadingProgress(state) {
            return state.loading_list_progress
        },
        getLoadingClose(state) {
            return state.loading_list_close
        },
        getListProgress(state) {
            return state.list_progress
        },
        getListClose(state) {
            return state.list_close
        },
        getList(state) {
            return state.list
        },
        getError(state) {
            return state.err
        },
        getDetail(state) {
            return state.detail
        },
        getLoadingListProgress(state) {
            return state.loading_list_progress
        },
        getLoadingListClose(state) {
            return state.loading_list_close
        },
        getPicList(state) {
            return state.pic_list
        },
        getDescList(state) {
            return state.desc_list
        },
        getEngginerSubmitId(state) {
            return state.engginer_submit_id
        }
    },
    mutations: {
        setDateHistory(state, date) {
            state.date_history = date
        },
        setDateWO(state, date) {
            state.date_wo = date
        },
        setDialog(state, stat) {
            state.dialog = stat
        },
        setListEngginer(state, list) {
            state.lightSearchEngginer = list
        },
        setDetail(state, data) {
            state.pic_list  = JSON.parse(data.pic_list)
            state.desc_list = JSON.parse(data.desc_list)

            state.engginer_submit_id = data.engginer_submit_id

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
        updateListProgress(state, list) {
            state.list_progress = state.list_progress.concat(list)
        },
        updateListClose(state, list) {
            state.list_close = state.list_close.concat(list)
        },
        setListProgress(state, list) {
            state.list_progress = list
        },
        setListClose(state, list) {
            state.list_close = list
        },
        setList(state, list) {
            state.list = list
        },
        removeList(state) {
            state.list = []
        },
        removeListProgress(state) {
            state.list_progress = []
        },
        removeListClose(state) {
            state.list_close = []
        },
        setLoading(state, stat) {
            state.loading = stat
        },
        setLoadingListProgress(state, stat) {
            state.loading_list_progress = stat
        },
        setLoadingListClose(state, stat) {
            state.loading_list_close = stat
        },
        setError(state, err) {
            state.err = err
        },
        removeError(state) {
            state.err = null
        }
    }
}