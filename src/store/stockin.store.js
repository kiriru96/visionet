export const stockin = {
    namespaced: true,
    state: {
        list_stock: [],
        loading: false,
        err: null,
        msg: null,
        asset_list: [],
        loading_asset: false
    },
    actions: {
        reqHistoryStock({commit, state}) {
            if(state.loading) return

            commit('setLoading', true)
            commit('removeError')

        }
    },
    getters: {
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
        }
    }
}