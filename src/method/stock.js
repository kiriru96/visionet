import { config } from "./config";

async function stockInHistory(path,{index, rows, search, sortby, sort}) {
    const result = {
        json: null,
        err: null
    }

    let reqconf = config.getconfig();
    
    try {
        const response = await fetch(
            config.getUrlParams(
                `${config.endpoint}`, 
                {page: index, search: search, sortby: sortby, sort: sort, rows: rows}),
                reqconf)

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

async function stockOutHistory(path,{index, rows, search, sortby, sort}) {
    const result = {
        json: null,
        err: null
    }

    let reqconf = config.getconfig();
    
    try {
        const response = await fetch(
            config.getUrlParams(
                `${config.endpoint}`, 
                {page: index, search: search, sortby: sortby, sort: sort, rows: rows}),
                reqconf)

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

async function addStockInHistory(data) {
    const result = {
        json: null,
        err: null
    }

    let reqconf = config.postdataconfig(data)

    try {
        const response = await fetch(`${config.endpoint}`, reqconf)
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

async function addStockOutHistory(asset, count) {
    const result = {
        json: null,
        err: null
    }

    let reqconf = config.postdataconfig(data)

    try {
        const response = await fetch(`${config.endpoint}`, reqconf)
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

async function removeStockIn(asset) {
    const result = {
        json: null,
        err: null
    }

    let reqconf = config.postdataconfig(data)

    try {
        const response = await fetch(`${config.endpoint}`, reqconf)
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

async function removeStockOut(asset) {
    const result = {
        json: null,
        err: null
    }

    let reqconf = config.postdataconfig(data)

    try {
        const response = await fetch(`${config.endpoint}`, reqconf)
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

async function submitListStockIn() {
    const result = {
        json: null,
        err: null
    }

    let reqconf = config.postdataconfig(data)

    try {
        const response = await fetch(`${config.endpoint}`, reqconf)
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

async function submitListStockOut() {
    const result = {
        json: null,
        err: null
    }

    let reqconf = config.postdataconfig(data)

    try {
        const response = await fetch(`${config.endpoint}`, reqconf)
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

export const stock = {
    stockInHistory,
    stockOutHistory,
    addStockInHistory,
    addStockOutHistory,
    removeStockIn,
    removeStockOut,
    submitListStockIn,
    submitListStockOuts
}