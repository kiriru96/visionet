import {config} from './config';

async function listWorkOrder(date, page) {
    let result = {
        json: null,
        err: null
    }

    let reqconf = config.getconfig();

    try {
        const response  = await fetch(
            config.getUrlParams(
                `${config.endpoint}/workorderrequest`, 
                {date: date, page: page}), 
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

async function detailWO(id){
    let result = {
        json: null,
        err: null
    }

    let reqconf = config.getconfig();

    try {
        const response  = await fetch(
            config.getUrlParams(
                `${config.endpoint}/workorderdetail`, 
                {id: id}), 
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

async function confirmWO(data) {
    let result = {
        json: null,
        err: null
    }
    
    let reqconf = config.postdataconfig(data);

    try{
        const response = await fetch(`${config.endpoint}/confirmwork`, reqconf)
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

async function editWO(data) {
    let result = {
        json: null,
        err: null
    }
    
    let reqconf = config.postdatafile(data);

    try{
        const response = await fetch(`${config.endpoint}/updatewoec`, reqconf)
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

async function insertWO(data) {
    let result = {
        json: null,
        err: null
    }
    
    let reqconf = config.postdatafile(data);

    try{
        const response = await fetch(`${config.endpoint}/submitwoec`, reqconf)
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

async function insertEngginerWO(data) {
    let result = {
        json: null,
        err: null
    }
    
    let reqconf = config.postdataconfig(data);

    try{
        const response = await fetch(`${config.endpoint}/setengginer`, reqconf)
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

async function lightSearchEngginer(search) {
    let result = {
        json: null,
        err: null
    }

    let reqconf = config.getconfig();

    try {
        const response  = await fetch(
            config.getUrlParams(
                `${config.endpoint}/light/engginer`, 
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

async function listCloseWorkOrder(date, page) {
    let result = {
        json: null,
        err: null
    }

    let reqconf = config.getconfig();

    try {
        const response  = await fetch(
            config.getUrlParams(
                `${config.endpoint}/listwoec/close`, 
                {date: date, page: page}), 
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

async function listProgressWorkOrder(date, page) {
    let result = {
        json: null,
        err: null
    }

    let reqconf = config.getconfig();

    try {
        const response  = await fetch(
            config.getUrlParams(
                `${config.endpoint}/listwoec/progress`, 
                {date: date, page: page}), 
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

async function listSubmitEngginer(date, page) {
    let result = {
        json: null,
        err: null
    }

    let reqconf = config.getconfig();

    try {
        const response  = await fetch(
            config.getUrlParams(
                `${config.endpoint}/engginersubmitlist`, 
                {date: date, page: page}), 
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

async function listWorkOrderEngginer(date, page) {
    let result = {
        json: null,
        err: null
    }

    let reqconf = config.getconfig();

    try {
        const response  = await fetch(
            config.getUrlParams(
                `${config.endpoint}/listengginerworkorder`, 
                {date: date, page: page}), 
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

async function workOrderReport({startdate, enddate}) {
    const result = {
        json: null,
        err: null
    }

    let reqconf = config.getconfig();
    
    try {
        const response = await fetch(
            config.getUrlParams(
                `${config.endpoint}/reportworkorder`, 
                {startdate:startdate, enddate:enddate}), reqconf)

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

export const manual = {
    workOrderReport,
    listWorkOrder,
    detailWO,
    insertEngginerWO,
    lightSearchEngginer,
    listWorkOrderEngginer,
    editWO,
    insertWO,
    listCloseWorkOrder,
    listProgressWorkOrder,
    listSubmitEngginer,
    confirmWO
}