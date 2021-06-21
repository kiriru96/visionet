import {stock} from '../method'

export let stockin = {
    namespaced: true,
    state: {
        list_stock: [],
        loading: false,
        err: null,
        msg: null,
        update: false,
        asset_list: [],
        loading_asset: false,
        report_table: []
    },
    actions: {
        async reqHistoryStockIn({commit, state}) {
            if(state.loading) return

            commit('removeList')
            commit('setLoading', true)
            commit('removeError')

            let res = await stock.stockInHistory()
            
            if(!res.err) {
                commit('setListStock', res.json.data.list)
            } else {
                commit('setError', res.err)
            }
            commit('setUpdate', false)
            commit('setLoading', false)
        },
        async reqHistoryStockOut({commit, state}) {
            if(state.loading) return

            commit('removeList')
            commit('setLoading', true)
            commit('removeError')

            let res = await stock.stockOutHistory()

            if(!res.err) {
                commit('setListStock', res.json.data.list)
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
        async inputStockIn({commit, state}, data) {
            if(state.loading) return

            commit('setLoading', true)
            commit('removeError')

            let res = await stock.addStockInHistory(data)
            
            if(!res.err) {
                commit('setUpdate', true)
            } else {
                commit('setError', res.err)
            }
            commit('setLoading', false)
        },
        async inputStockOut({commit, state}, data) {
            if(state.loading) return

            commit('setLoading', true)
            commit('removeError')

            let res = await stock.addStockOutHistory(data)

            if(!res.err) {
                commit('setUpdate', true)
            } else {
                commit('setError', res.err)
            }
            commit('setLoading', false)
        },
        async submitListStockIn({commit, state}) {
            if(state.loading) return

            commit('setLoading', true)
            commit('removeError')

            let res = await stock.submitListStockIn({})

            if(!res.err) {
                commit('setUpdate', true)
            } else {
                commit('setError', res.err)
            }
            commit('setLoading', false)
        },
        async submitListStockOut({commit, state}) {
            if(state.loading) return

            commit('setLoading', true)
            commit('removeError')

            let res = await stock.submitListStockOut({})

            if(!res.err) {
                commit('setUpdate', true)
            } else {
                commit('setError', res.err)
            }
            commit('setLoading', false)
        },
        async deleteStockIn({commit, state}, data) {
            if(state.loading) return

            commit('setLoading', true)
            commit('removeError')

            let res = await stock.removeStockIn(data)

            if(!res.err) {
                commit('setUpdate', true)
            } else {
                commit('setError', res.err)
            }
            commit('setLoading', false)
        },
        async deleteStockOut({commit, state}, data) {
            if(state.loading) return

            commit('setLoading', true)
            commit('removeError')

            let res = await stock.removeStockOut(data)

            if(!res.err) {
                commit('setUpdate', true)
            } else {
                commit('setError', res.err)
            }
            commit('setLoading', false)
        },
        async tableReportStockIn({commit, state}, {startdate, enddate}) {
            if(state.loading) return

            commit('removeTableReport')
            commit('setLoading', true)
            commit('removeError')

            let res = await stock.tableInHistory({startdate:startdate, enddate:enddate})
            
            if(!res.err) {
                commit('setTableReport', res.json.data.list)
            } else {
                commit('setError', res.err)
            }
            commit('setUpdate', false)
            commit('setLoading', false)
        },
        async tableReportStockOut({commit, state}, {startdate, enddate}) {
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
        }
    },
    getters: {
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
        setListStock(state, list) {
            state.list_stock = list
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
        }
    }
}