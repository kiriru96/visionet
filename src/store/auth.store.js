import {login} from '../method';
import router from '../router';

const token = localStorage.getItem("token");
const user_type = localStorage.getItem("user_type");
const name = localStorage.getItem("name")

const initState = token ? {isLogged: true, token: token, loading: false, err_msg: null, user_type: user_type, name: name} : {isLogged: false, token: 'null', loading: false, err_msg: null, user_type: null, name: ''};
const typeList = ['Admin', 'Leader', 'Backup Leader', 'Enginner'];

export const auth = {
    namespaced: true,
    state: initState,
    actions: {
        async login({commit}, data) {
            commit('setLoading', true)
            commit('setErrMsg', null)

            let typeIndex = typeList.indexOf(data.type);

            let res = await login.authentication(data.username, data.password, typeIndex);

            if(!res.err) {
                commit('saveUser', {token: res.json.token, user_type: typeIndex, name: res.json.data.name})
                commit('setLogged', true)
                router.push('/')
            } else {
                commit('setErrMsg', res.err)
                setTimeout(()=> {
                    commit('setErrMsg', null)
                }, 2500)
            }

            setTimeout(()=> {
                commit('setLoading', false)
            }, 500)
        },
        logout({commit}) {
            commit('setLogout')
            router.push('/login')
        }
    },
    getters: {
        getLoading(state) {
            return state.loading
        },
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
        },
        getName(state) {
            return state.name
        }
    },
    mutations: {
        saveUser(state, {token, user_type, name}) {
            localStorage.setItem("token", token);
            localStorage.setItem("user_type", user_type);
            localStorage.setItem("name", name)
            state.token     = token;
            state.user_type = user_type;
        },
        setLogged(state, status) {
            state.isLogged = status;
        },
        setLogout(state) {
            localStorage.clear();
            state.isLogged  = false;
            state.token     = null;
            state.user_type = null;
        },
        setLoading(state, status) {
            state.loading = status;
        },
        setErrMsg(state, error) {
            state.err_msg = error;
        }
    }
}