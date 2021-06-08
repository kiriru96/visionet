
export const account = {
    namespaced: true,
    state: {
        name: '',
        username: ''
    },
    actions: {
        async detailAccount({commit}) {

        }
    },
    getters: {
        getDetailAccount(state) {
            return {name: state.name, username: state.username}
        }
    },
    mutations: {
        setAccountProfile(state, {name, username}) {
            state.name = name
            state.username = username
        }
    }
}