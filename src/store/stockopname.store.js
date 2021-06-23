import {stock} from '../method'

export let stockopname = {
    namespaced: true,
    state: {
        list_stock: [],
        totalitems: 0,
        loading: false,
        err: null,
        msg: null,
        update: false,
        asset_list: [],
        loading_asset: false,
        report_table: [],
        stock_opname_id: 0,
        stock_opname_date: '',
        id_selected: 0
    },
    actions: {
        async reqList({commit, state}, {index, rows, search, sortby, sort}) {
            if(state.loading) return

            commit('removeList')
            commit('setLoading', true)
            commit('removeError')

            let res = await stock.listStockOpnameList({index: index, rows: rows, search: search, sortby: sortby, sort: sort})
            
            if(!res.err) {
                commit('setListStock', {items: res.json.data.list, len: res.json.data.len})
            } else {
                commit('setError', res.err)
            }
            commit('setUpdate', false)
            commit('setLoading', false)
        },
        async searchAsset({commit, state}, search) {
            if(state.loading_asset) return

            commit('setLoadingAsset', true)
            let res = await stock.searchAsset(search)

            if(!res.err) {
                commit('setAssetList', res.json.data.list)
            } else {
                commit('setError', res.err)
            }
            commit('setLoadingAsset', false)
        },
        async inputStock({commit, state}, data) {
            if(state.loading) return

            commit('setLoading', true)
            commit('removeError')

            let res = await stock.insertStockOpname(data)
            
            if(!res.err) {
                commit('setUpdate', true)
            } else {
                commit('setError', res.err)
            }
            commit('setLoading', false)
        },
        async createStockOpname({commit, state}) {
            if(state.loading) return

            commit('setLoading', true)
            commit('removeError')

            let res = await stock.createStockOpname()

            if(!res.err) {
                commit('setStockHistory', {id: res.json.data.id, date:  res.json.data.date})
            } else {
                commit('setStockHistory', {id: 0, date: ''})
                commit('setError', res.err)
            }

            commit('setLoading', false)
        },
        async checkStockOpnameHistory({commit, state}) {
            commit('removeError')

            let res = await stock.checkStockOpnameHistory()

            if(!res.err) {
                commit('setStockHistory', {id: res.json.data.id, date:  res.json.data.date})
            } else {
                commit('setStockHistory', {id: 0, date: ''})
                commit('setError', res.err)
            }
        },
        async submitListStock({commit, state}) {
            if(state.loading) return

            commit('setLoading', true)
            commit('removeError')

            let res = await stock.submitListStock({})

            if(!res.err) {
                commit('setUpdate', true)
            } else {
                commit('setError', res.err)
            }
            commit('setLoading', false)
        },
        async deleteStock({commit, state}, data) {
            if(state.loading) return

            commit('setLoading', true)
            commit('removeError')

            let res = await stock.deleteStockOpname(data)

            if(!res.err) {
                commit('setUpdate', true)
            } else {
                commit('setError', res.err)
            }
            commit('setLoading', false)
        },
        async tableReportStock({commit, state}, {startdate, enddate}) {
            if(state.loading) return

            commit('removeTableReport')
            commit('setLoading', true)
            commit('removeError')

            let res = await stock.tableOutHistory({startdate:startdate, enddate:enddate})
            
            if(!res.err) {
                commit('setTableReport', res.json.data.list)
            } else {
                commit('setError', res.err)
            }
            commit('setUpdate', false)
            commit('setLoading', false)
        },
        removeTableReport({commit}) {
            commit('removeTableReport')
        },
        submitIdSelected({commit}, id) {
            commit('setIdSelected', id)
        }
    },
    getters: {
        getIdStockHistory(state) {
            return state.stock_opname_id
        },
        getDateStockHistory(state) {
            return state.stock_opname_date
        },
        getTotalItems(state) {
            return state.totalitems
        },
        getReportTable(state) {
            return state.report_table
        },
        getUpdate(state) {
            return state.update
        },
        getListStock(state) {
            return state.list_stock
        },
        getListAsset(state) {
            return state.asset_list
        },
        getLoading(state) {
            return state.loading
        },
        getError(state) {
            return state.err
        },
        getMessage(state) {
            return state.msg
        },
        getLoadingAsset(state) {
            return state.loading_asset
        },
        getSelectedID(state) {
            return state.id_selected
        }
    },
    mutations: {
        setIdSelected(state, id) {
            state.id_selected = id
        },
        setStockHistory(state, {id, date}) {
            state.stock_opname_id = id
            state.stock_opname_date = date
        }, 
        setTableReport(state, list) {
            state.report_table = list
        },
        removeTableReport(state) {
            state.report_table = []
        },
        setUpdate(state, stat) {
            state.update = stat
        },
        setListStock(state, {items, len}) {
            state.list_stock = items
            state.totalitems = len
        },
        setAssetList(state, list) {
            state.asset_list = list
        },
        setLoading(state, stat) {
            state.loading = stat
        },
        setLoadingAsset(state, stat) {
            state.loading_asset = stat  
        },
        setError(state, err) {
            state.err = err
        },
        setMessage(state, msg) {
            state.msg = msg
        },
        removeError(state) {
            state.err = null
        },
        removeList(state) {
            state.list_stock = []
            state.totalitems = 0
        }
    }
}