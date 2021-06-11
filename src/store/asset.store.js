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
        lightSearchCustomer: []
    },
    actions: {
        reqList({commit}, {index, rows, search, sortby, sort}) {
            
        },
        openDialog({commit}) {
            commit('setDialog', true)
        },
        closeDialog({commit}) {
            commit('setDialog', false)
        }

    },
    getters: {
        getList(state) {
            return state.listItems
        },
        getDialog(state) {
            return state.dialog
        },
        isLoading(state) {
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
        }
    },
    mutations: {
        setList(state, {list, length}) {
            state.listItems = list
            state.totalitems = length
        },
        setListLightBrand(state, list) {
            state.lightSearchBrand = list
        },
        setListLightDevice(state, list) {
            state.lightSearchBrand = list
        },
        setListLightWarehouse(state, list) {
            state.lightSearchBrand = list
        },
        setListLightCondition(state, list) {
            state.lightSearchBrand = list
        },
        setListLightLocation(state, list) {
            state.lightSearchBrand = list
        },
        setListLightCustomer(state, list) {
            state.lightSearchBrand = list
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