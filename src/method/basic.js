import {config} from './config';

async function list(path, index, limit) {
    let result = {
        json: null,
        err: null
    }

    let reqconf = config.getconfig();

    try {
        const response  = await fetch(`${config.endpoint}/list/${path}`, reqconf)
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

async function del(path, id) {
    let result = {
        json: null,
        err: null
    }

    let reqconf = config.postdataconfig(`${config.endpoint}/delete/${path}`, reqconf)

    try {
        const response  = await fetch(`${config.endpoint}/delete/${path}, reward`)
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

async function submit(path, data) {
    let result = {
        json: null,
        err: null
    }
    
    let reqconf = config.postdataconfig(data);

    try{
        const response = await fetch(`${config.endpoint}/insert/${path}`, reqconf)
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

export const basic = {
    submit,
    del,
    list
}