import { assets } from "../method"

export const asset = {
    namespaced: true,
    state: {
        listItems: [],
        totalitems: 0,
        loading: false,
        insert: false,
        dialog: false,
        errMsg: null,
        update: false,
        msg: null,
        lightSearchBrand: [],
        lightSearchDevice: [],
        lightSearchWareHouse: [],
        lightSearchCondition: [],
        lightSearchLocation: [],
        lightSearchCustomer: [],
        loadingDevice: false,
        loadingBrand: false,
        loadingWarehouse: false,
        loadingLocation: false,
        loadingCustomer: false,
        detailStock: null
    },
    actions: {
        async reqList({commit, state}, {index, rows, search, sortby, sort}) {
            if(state.loading) return

            commit('removeError')
            commit('setLoading', true)

            let res = await assets.list({index: index, rows: rows, search: search, sortby: sortby, sort: sort})

            if(!res.err) {
                commit('setList', {items: res.json.data.list, len: res.json.data.len})
                commit('setUpdate', false)
            } else {
                commit('removeListItem')
                commit('setError', res.err)
            }
            commit('setLoading', false)
        },
        async insertWorkOrder({commit, state}, data) {
            if(state.loading) return

            commit('removeError')
            commit('setLoading', true)
            commit('setInsert', true)

            let res = await assets.createWorkOrder(data)

            if(!res.err) {
                commit('setDialog', false)
                commit('setUpdate', true)
            } else {
                commit('setError', res.err)
            }

            commit('setLoading', false)
        },
        async insertAsset({commit, state}, data) {
            if(state.loading) return

            commit('removeError')
            commit('setLoading', true)
            commit('setInsert', true)

            let res = await assets.create(data)

            if(!res.err) {
                commit('setDialog', false)
                commit('setUpdate', true)
            } else {
                commit('setError', res.err)
            }

            commit('setLoading', false)
        },
        async updateAsset({commit, state}, data) {
            if(state.loading) return

            commit('removeError')
            commit('setLoading', true)
            commit('setInsert', true)

            let res = await assets.update(data)

            if(!res.err) {
                commit('setDialog', false)
                commit('setUpdate', true)
            } else {
                commit('setError', res.err)
            }

            commit('setLoading', false)
        },
        async deleteAsset({commit, state}, id) {
            if(state.loading) return

            commit('removeError')
            commit('setLoading', true)

            let res = await assets.deletes({id: id})

            if(!res.err) {
                commit('setUpdate', true)
            } else {
                commit('setError', res.err)
            }
            
            commit('setLoading', false)
        },
        async getDetailStock({commit}) {
            let res = await assets.detailStock()

            if(!res.err) {
                commit('setDetailStock', res.json.data)
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
        async searchDevice({commit, state}, search) {
            if(search.trim().length >= 3 && !state.loading) {
                commit('removeError')
                commit('setLoadingDevice', true)

                let result = await assets.searchLight('device', search)

                if(!result.err) {
                    commit('setListLightDevice', result.json.data.list)
                    commit('setUpdate', false)
                } else {
                    commit('setError', result.err)
                }

                commit('setLoadingDevice', false)
            }
        },
        async searchBrand({commit, state}, search) {
            if(search.trim().length >= 3 && !state.loading) {
                commit('removeError')
                commit('setLoadingBrand', true)

                let result = await assets.searchLight('brand', search)

                if(!result.err) {
                    commit('setListLightBrand', result.json.data.list)
                } else {
                    commit('setError', result.err)
                }
                commit('setLoadingBrand', false)
            }
        },
        async searchWarehouse({commit, state}, search) {
            if(search.trim().length >= 3 && !state.loading) {
                commit('removeError')
                commit('setLoadingWarehouse', true)

                let result = await assets.searchLight('warehouse', search)

                if(!result.err) {
                    commit('setListLightWarehouse', result.json.data.list)
                } else {
                    commit('serError', result.err)
                }
                commit('setLoadingWarehouse', false)
            }
        },
        async searchCondition({commit}) {
            commit('removeError')

            let result = await assets.searchLight('condition', '')

            if(!result.err) {
                commit('setListLightCondition', result.json.data.list)
            } else {
                commit('setError', result.err)
            }
        },
        async searchLocation({commit, state}, search) {
            if(search.trim().length >= 3 && !state.loading) {
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
        async searchCustomer({commit, state}, search) {
            if(search.trim().length >= 3 && !state.loading) {
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
        removeError({commit}) {
            commit('removeError')
        }
    },
    getters: {
        getUpdate(state) {
            return state.update
        },
        getList(state) {
            return state.listItems
        },
        getDialog(state) {
            return state.dialog
        },
        getLoading(state) {
            return state.loading
        },
        getTotalItems(state) {
            return state.totalitems
        },
        getListLightBrand(state) {
            return state.lightSearchBrand
        },
        getListLightDevice(state) {
            return state.lightSearchDevice
        },
        getListLightWarehouse(state) {
            return state.lightSearchWareHouse
        },
        getListLightCondition(state) {
            return state.lightSearchCondition
        },
        getListLightLocation(state) {
            return state.lightSearchLocation
        },
        getListLightCustomer(state) {
            return state.lightSearchCustomer
        },
        getError(state) {
            return state.errMsg
        },
        getMsg(state) {
            return state.msg
        },
        getLoadingBrand(state) {
            return state.loadingBrand
        },
        getLoadingDevice(state) {
            return state.loadingDevice
        },
        getLoadingWarehouse(state) {
            return state.loadingWarehouse
        },
        getLoadingCustomer(state) {
            return state.loadingCustomer
        },
        getLoadingLocation(state) {
            return state.loadingLocation
        },
        getConditions(state) {
            return state.lightSearchCondition
        },
        getDetailStock(state) {
            return state.detailStock
        }
    },
    mutations: {
        setDetailStock(state, data) {
            state.detailStock = data
        },
        setUpdate(state, stat) {
            state.update = stat
        },
        setList(state, {items, len}) {
            state.listItems = items
            state.totalitems = len
        },
        setListLightBrand(state, list) {
            state.lightSearchBrand = list
        },
        setListLightDevice(state, list) {
            state.lightSearchDevice = list
        },
        setListLightWarehouse(state, list) {
            state.lightSearchWareHouse = list
        },
        setListLightCondition(state, list) {
            state.lightSearchCondition = list
        },
        setListLightLocation(state, list) {
            state.lightSearchLocation = list
        },
        setListLightCustomer(state, list) {
            state.lightSearchCustomer = list
        },
        setLoadingBrand(state, stat) {
            state.loadingBrand = stat
        },
        setLoadingDevice(state, stat) {
            state.loadingDevice = stat
        },
        setLoadingWarehouse(state, stat) {
            state.loadingWarehouse = stat
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
        removeListItem(state) {
            state.listItems = []
            state.totalitems = 0
        },
        removeListLightBrand(state) {
            state.lightSearchBrand.length = 0
        },
        removeListLightDevice(state) {
            state.lightSearchDevice.length = 0
        },
        removeListLightWarehouse(state) {
            state.lightSearchWareHouse.length = 0
        },
        removeListLightCondition(state) {
            state.lightSearchCondition.length = 0
        },
        removeListLightLocation(state) {
            state.lightSearchLocation.length = 0
        },
        removeListLightCustomer(state) {
            state.lightSearchCustomer.length = 0
        },
        setError(state, err) {
            state.errMsg = err
        },
        removeError(state) {
            state.errMsg = null
        },
        setMsg(state, msg) {
            state.msg = msg
        },
        removeMsg(state) {
            state.msg = null
        },
        setDialog(state, stat) {
            state.dialog = stat
        },
        setInsert(state, stat) {
            state.insert = stat
        }
    }
}