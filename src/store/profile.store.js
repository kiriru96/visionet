import { profiles } from "../method"

export const profile = {
    namespaced: true,
    state: {
        account: {
            type: -1,
            username: '',
            fullname: '',
            picture: ''
        },
        loading: false,
        err: null
    },
    actions: {
        async getProfile({commit, state}) {
            if(state.loading) return

            commit('setLoading', true)
            commit('removeError')

            const res = await profiles.getProfile()

            if(!res.err) {
                commit('setAccount', res.json.data)
            } else {
                commit('setError', res.err)
            }

            commit('setLoading', false)
        },
        async updateName({commit, state}, data) {
            if(state.loading) return

            commit('setLoading', true)
            commit('removeError')

            let res = await profiles.updateName(data)

            if(!res.err) {
                commit('setError', res.json.msg)
            } else {
                commit('setError', res.err)
            }

            commit('setLoading', false)
        },
        async updatePassword({commit, state}, data) {
            if(state.loading) return

            commit('setLoading', true)
            commit('removeError')

            let res = await profiles.updatePassword(data)

            if(!res.err) {
                commit('setError', res.json.msg)
            } else {
                commit('setError', res.err)
            }

            commit('setLoading', false)
        },
        async updateUsername({commit, state}, data) {
            if(state.loading) return

            commit('setLoading', true)
            commit('removeError')

            let res = await profiles.updateUsername(data)

            if(!res.err) {
                commit('setError', res.json.msg)
            } else {
                commit('setError', res.err)
            }

            commit('setLoading', false)
        }
    },
    getters: {
        getType(state) {
            return state.account.type
        },
        getName(state) {
            return state.account.fullname
        },
        getUsername(state) {
            return state.account.username
        },
        getLoading(state) {
            return state.loading
        },
        getError(state) {
            return state.err
        }
    },
    mutations: {
        setAccount(state, data) {
            if(data.type != 0) {
                state.account = {
                    type: data.type,
                    username: data.username,
                    fullname: data.name
                }
            } else {
                state.account = {
                    type: data.type,
                    username: data.username,
                    fullname: data.name
                }
            }
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