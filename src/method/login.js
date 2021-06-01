import {config} from './config';

async function authentication(username, password, type) {
    let result = {
        json: null,
        err: null
    }
    
    let reqconf = config.postdataconfig({username: username, password: password, type: type});

    try{
        const response = await fetch(`${config.endpoint}/authentication`, reqconf)
        const fetchres = await response.json()

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

async function check() {
    let result = {
        json: null,
        err: null
    }

    try{
        const response = await fetch(`${config.endpoint}/check`, config.postdataconfig({}))
        const fetchres = await response.json()
    
        if(response.status === 200) {
            result.json = fetchres
        } else {
            result.err = fetchres.message
        }
    } catch(err) {
        result.err = err
    }
    
    return result
}

export const login = {
    authentication,
    check
}