const token = localStorage.getItem("token");
const user_type = localStorage.getItem("user_type");

const initState = token ? {isLogged: true, token: token, loading: false, err_msg: null, user_type: user_type} : {isLogged: false, token: null, loading: false, err_msg: null, user_type: null};

export const auth = {
    namespaced: true,
    state: initState,
    actions: {
        // login({commit}, {username, password}) {

        // }
    },
    getters: {
        getError(state) {
            return state.err_msg;
        },
        logStatus(state) {
            return state.isLogged;
        },
        getToken(state) {
            return state.token;
        },
        getUserType(state) {
            return state.user_type;
        }
    },
    mutations: {
        saveUser(state, {token, user_type}) {
            localStorage.setItem("token", token);
            localStorage.setItem("user_type", user_type);
            state.token = token;
            state.user_type = user_type;
        },
        setLogged(state) {
            state.isLogged = true;
        },
        setLogout(state) {
            localStorage.clear();
            state.isLogged = false;
            state.token = null;
            state.user_type = null;
        },
        setLoading(state, {status}) {
            state.loading = status;
        },
        setErrMsg(state, {err}) {
            state.err_msg = err;
        }
    }
}