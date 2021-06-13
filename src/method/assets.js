import {config} from './config'

async function submit({devicename, devicebrand, model, serialnumber, condition, description, warehouse}) {
    let result = {
        json: null,
        err: null
    }
    
    let reqconf = config.postdataconfig({devicename: devicename, devicebrand: devicebrand, model: model, serialnumber: serialnumber, condition: condition, description: description, warehouse: warehouse});

    try{
        const response = await fetch(`${config.endpoint}/addasset`, reqconf)
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

async function list({index, rows, search, sortby, sort}) {
    let result = {
        json: null,
        err: null
    }

    let reqconf = config.getconfig();

    try {
        const response  = await fetch(
            config.getUrlParams(
                `${config.endpoint}/list/assets`, 
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
        const response = await fetch(`${config.endpoint}/updateasset`, reqconf);
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
        const response = await fetch(`${config.endpoint}/addasset`, reqconf);
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

async function searchLight(path, search) {
    let result = {
        json: null,
        err: null
    }

    let reqconf = config.getconfig();

    try {
        const response  = await fetch(
            config.getUrlParams(
                `${config.endpoint}/light/${path}`, 
                {search: search}), 
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

export const assets = {
    list,
    deletes,
    update,
    create,
    searchLight
}