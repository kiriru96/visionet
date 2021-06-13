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
        msg: null,
        lightSearchBrand: [],
        lightSearchDevice: [],
        lightSearchWareHouse: [],
        lightSearchCondition: [],
        lightSearchLocation: [],
        lightSearchCustomer: [],
        loadingDevice: false,
        loadingBrand: false,
        loadingWarehouse: false
    },
    actions: {
        async reqList({commit, state}, {index, rows, search, sortby, sort}) {
            if(state.loading) return

            commit('removeError')
            commit('setLoading', true)

            let res = await assets.list({index: index, rows: rows, search: search, sortby: sortby, sort: sort})

            if(!res.err) {
                commit('setList', {items: res.json.data.list, len: res.json.data.len})
            } else {
                commit('removeListItem')
                commit('setError', res.err)
            }
            commit('setLoading', false)
        },
        async insertAsset({commit}, data) {
            commit('removeError')
            commit('setLoading', true)
            commit('setInsert', true)

            let res = await assets.create(data)

            if(!res.err) {

            } else {
                commit('setError', res.err)
            }

            commit('setLoading', false)
        },
        async updateAsset({commit}, data) {
            commit('removeError')
            commit('setLoading', true)
            commit('setInsert', true)

            let res = await assets.update(data)

            if(!res.err) {

            } else {
                commit('setError', res.err)
            }

            commit('setLoading', false)
        },
        async deleteAsset({commit}, id) {
            commit('removeError')
            commit('setLoading', true)

            let res = await assets.deletes({id: id})

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
        async searchDevice({commit}, search) {
            if(search.trim().length >= 3) {
                commit('removeError')

                let result = await assets.searchLight('device', search)

                if(!result.err) {
                    commit('setListLightDevice', result.json.data.list)
                } else {
                    commit('setError', result.err)
                }
            }
        },
        async searchBrand({commit}, search) {
            if(search.trim().length >= 3) {
                commit('removeError')

                let result = await assets.searchLight('brand', search)

                if(!result.err) {
                    commit('setListLightBrand', result.json.data.list)
                } else {
                    commit('setError', result.err)
                }
            }
        },
        async searchWarehouse({commit}, search) {
            if(search.trim().length >= 3) {
                commit('removeError')

                let result = await assets.searchLight('warehouse', search)

                if(!result.err) {
                    commit('setListLightWarehouse', result.json.data.list)
                } else {
                    commit('serError', result.err)
                }
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
        async searchLocation({commit}, search) {
            if(search.trim().length >= 3) {
                commit('removeError')

                let result = await assets.searchLight('location', search)

                if(!result.err) {
                    commit('setListLightLocation', result.json.data.list)
                } else {
                    commit('setError', result.err)
                }
            }
        },
        async searchCustomer({commit}, search) {
            if(search.trim().length >= 3) {
                commit('removeError')

                let result = await assets.searchLight('customer', search)

                if(!result.err) {
                    commit('setListLightCustomer', result.json.data.list)
                } else {
                    commit('serError', result.err)
                }
            }
        },
        removeError({commit}) {
            commit('removeError')
        }
    },
    getters: {
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
        getConditions(state) {
            return state.lightSearchCondition
        }
    },
    mutations: {
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
        setLoading(state, stat) {
            state.loading = stat
        },
        removeListItem(state) {
            state.listItems.length = 0
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