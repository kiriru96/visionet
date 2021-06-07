import {config} from './config'

async function submit({}) {

}

async function list(data) {
    let result = {
        json: null,
        err: null
    }

    let reqconf = config.getconfig();

    try{
        const response = await fetch(config.getUrlParams(config.endpoint, data), reqconf);
        const fetchres = await response.json();

        if(response.status === 200) {
            if(fetchres.status) {
                result.json = fetchres;
            } else {
                result.err  = fetchres.msg;
            }
        } else {
            result.err  = response.statusText;
        }
    } catch(err) {
        result.err  = err;
    }

    return result;
}

async function deletes(data) {
    let result = {
        json: null,
        err: null
    }

    let reqconf = config.postdataconfig(data);

    try{
        const response = await fetch(`${config.endpoint}/asset/delete`, reqconf);
        const fetchres = await response.json();

        if(response.status === 200) {
            if(fetchres.status) {
                result.json = fetchres;
            } else {
                result.err = fetchres.msg;
            }
        } else {
            result.err = response.statusText;
        }
    } catch(err) {
        result.err  = err;
    }

    return result;
}

async function update(data) {
    let result = {
        json: null,
        err: null
    }

    let reqconf = config.postdataconfig(data);

    try{
        const response = await fetch(`${config.endpoint}/asset/delete`, reqconf);
        const fetchres = await response.json();

        if(response.status === 200) {
            if(fetchres.status) {
                result.json = fetchres;
            } else {
                result.err = fetchres.msg;
            }
        } else {
            result.err = response.statusText;
        }
    } catch(err) {
        result.err  = err;
    }

    return result;
}

async function create(data) {
    let result = {
        json: null,
        err: null
    }

    let reqconf = config.postdataconfig(data);

    try{
        const response = await fetch(`${config.endpoint}/asset/delete`, reqconf);
        const fetchres = await response.json();

        if(response.status === 200) {
            if(fetchres.status) {
                result.json = fetchres;
            } else {
                result.err = fetchres.msg;
            }
        } else {
            result.err = response.statusText;
        }
    } catch(err) {
        result.err  = err;
    }

    return result;
}

export const asset = {
    list,
    deletes,
    update,
    create
}