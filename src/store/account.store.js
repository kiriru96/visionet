import { account } from "../method"

export const accounts = {
    namespaced: true,
    state: {
        name: '',
        username: '',
        loading: false,
        err: null,
        lightSearchLocation: [],
        loadingLocation: false
    },
    actions: {
        async detailAccount({commit}) {

        },
        async searchLocation({commit, state}, search) {
            if(search.trim().length >= 3 && !state.loading) {
                commit('removeError')
                commit('setLoadingLocation', true)

                let result = await account.searchLight('location', search)

                if(!result.err) {
                    commit('setListLightLocation', result.json.data.list)
                } else {
                    commit('setError', result.err)
                }
                commit('setLoadingLocation', false)
            }
        },
    },
    getters: {
        getDetailAccount(state) {
            return {name: state.name, username: state.username}
        },
        getError(state) {
            return state.errMsg
        },
        getListLightLocation(state) {
            return state.lightSearchLocation
        },
        getLoading(state) {
            return state.loading
        },
        getLoadingLocation(state) {
            return state.loadingLocation
        }
    },
    mutations: {
        setAccountProfile(state, {name, username}) {
            state.name = name
            state.username = username
        },
        setLoading(state, stat) {
            state.loading = stat
        },
        setLoadingLocation(state, stat) {
            state.loadingLocation = stat
        },
        setError(state, err) {
            state.errMsg = err
        },
        removeError(state) {
            state.errMsg = null
        },
        setListLightLocation(state, list) {
            state.lightSearchLocation = list
        },
    }
}