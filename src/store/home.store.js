import {homereq} from '../method'

export const home = {
    namespaced: true,
    state: {
        customer: 0,
        assets: 0,
        wo: 0,
        stock: 0,
        loading: false,
        err: null
    },
    actions: {
        async getHomeData({commit}) {
            commit('removeError')
            commit('setLoading', true)

            let res = await homereq.listdata()

            if(!res.err) {
                let data = res.json.data

                commit('setData', {customer: data.customer, assets: data.assets, wo: data.wo, stock: data.stock})
            } else {
                commit('setError', res.err)
            }

            commit('setLoading', false)
        },
        removeError({commit}) {
            commit('removeError')
        }
    },
    getters: {
        getData(state) {
            return {
                customer: state.customer,
                assets: state.assets,
                wo: state.wo,
                stock: state.stock
            }
        },
        getLoading(state) {
            return state.loading
        },
        getError(state) {
            return state.err
        }
    },
    mutations: {
        setData(state, {customer, assets, wo, stock}) {
            state.customer       = customer
            state.assets       = assets
            state.wo      = wo
            state.stock   = stock
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