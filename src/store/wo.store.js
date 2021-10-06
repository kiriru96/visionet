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
            location: '',
            engineername: ''
        },
        update: false,
        dialog: false,
        lightSearchEngineer: [],
        report_table: []
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

            let res = await manual.listSubmitEngineer(date, page)
            
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

            let res = await manual.listSubmitEngineer(date, page)

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
        async reportWorkOrder({commit, state}, {startdate, enddate}) {
            if(state.loading) return

            commit('removeTableReport')
            commit('setLoading', true)
            commit('removeError')

            let res = await manual.workOrderReport({startdate:startdate, enddate:enddate})
            
            if(!res.err) {
                commit('setTableReport', res.json.data.list)
            } else {
                commit('setError', res.err)
            }
            commit('setUpdate', false)
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
        async inputEngineer({commit, state}, data) {
            if(state.loading) return

            commit('removeError')
            commit('setLoading', true)

            let res = await manual.insertEngineerWO(data)

            if(!res.err) {
                commit('setDialog', false)
                commit('setError', res.json.msg)
            } else {
                commit('setError', res.err)
            }
            commit('setLoading', false)
        },
        async searchEngineer({commit, state}, search) {
            if(state.loading) return
            
            commit('removeError')
            commit('setLoading', true)

            let res = await manual.lightSearchEngineer(search)

            if(!res.err) {
                commit('setListEngineer', res.json.data.list)
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
        removeTableReport({commit}) {
            commit('removeTableReport')
        }
    },
    getters: {
        getReportTable(state) {
            return state.report_table
        },
        getDialog(state) {
            return state.dialog
        },
        getLightSearchEngineer(state) {
            return state.lightSearchEngineer
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
        setTableReport(state, list) {
            state.report_table = list
        },
        removeTableReport(state) {
            state.report_table = []
        },
        setUpdate(state, stat) {
            state.update = stat
        },
        setDialog(state, stat) {
            state.dialog = stat
        },
        setListEngineer(state, list) {
            state.lightSearchEngineer = list
        },
        setDetail(state, data) {
            state.detail = {
                woid: data.id,
                assetid: data.asset_id,
                device: data.devicename,
                serial_number: data.serial_number,
                customer: data.customername,
                location: data.locationname,
                engineername: data.engineername 
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