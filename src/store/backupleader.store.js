export const backupleader = {
    namespaced: true,
    state: {
        listItems: [],
        totalitems: 0,
        loading: false,
        insert: false,
        dialog: false,
        lightSearchLocation: []
    },
    actions: {
        reqList({commit}, {index, rows, search, sortby, sort}) {
            
        },
        submitAccount({commit}, data) {

        },
        updateAccount({commit}, data) {

        },
        deleteAccount({commit}, id) {

        },
        searchLocation({commit}, name) {
            if(name.length >= 3) {

            }
        }
    },
    getters: {
        getTotalItems(state) {
            return state.totalitems
        }
    },
    mutations: {
        
    }
}