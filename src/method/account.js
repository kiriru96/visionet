import {config} from './config'

async function updatePassword() {

}

async function getProfile() {

}

async function submit() {

}

async function update() {

}

async function del() {

}

async function list(path,{index, rows, search, sortby, sort}) {
    let result = {
        json: null,
        err: null
    }

    let reqconf = config.getconfig();

    try {
        const response  = await fetch(
            config.getUrlParams(
                `${config.endpoint}/list/${path}`, 
                {page: index, search: search, sortby: sortby, sort: sort, rows: rows}), 
                reqconf)
        const fetchres  = await response.json()
        
        if(response.status === 200) {
            if(fetchres.status) {
                result.json = fetchres
            } else {
                result.err = fetchres.msg
            }
        } else {
            result.err = response.statusText
        }
    } catch(err) {
        result.err = err
    }

    return result
}

export const account = {
    updatePassword,
    getProfile,
    list,
    submit,
    update,
    del
}