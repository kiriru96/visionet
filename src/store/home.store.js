import {homereq} from '../method'

export const home = {
    namespaced: true,
    state: {
        alldata: 0,
        newdata: 0,
        useddata: 0,
        damageddata: 0,
        repaireddata: 0,
        dumpdata: 0,
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

                commit('setData', {_all: data.all, _new: data.new, _used: data.used, _damaged: data.damaged, _repaired: data.repaired, _dump: data.dump})
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
                all: state.alldata,
                new: state.newdata,
                used: state.useddata,
                damaged: state.damageddata,
                repaired: state.repaireddata,
                dump: state.dumpdata
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
        setData(state, {_all, _new, _used, _damaged, _repaired, _dump}) {
            state.alldata       = _all
            state.newdata       = _new
            state.useddata      = _used
            state.damageddata   = _damaged
            state.repaireddata  = _repaired
            state.dumpdata      = _dump
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