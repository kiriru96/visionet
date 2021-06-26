import { config } from "./config";

async function getProfile() {
    let result = {
        err: null,
        json: null
    }

    let reqconf = config.getconfig()

    try {
        const response = await fetch(`${config.endpoint}/profile`, reqconf)

        const fetchres = await response.json()

        if(response.status === 200) {
            if(fetchres.status) {
                result.json = fetchres
            } else {
                result.err = fetchres.json.msg
            }
        } else {
            result.err = response.statusText
        }
    } catch(err) {
        result.err = err
    }

    return result
}

async function updateName(data) {
    let result = {
        err: null,
        json: null
    }

    let reqconf = config.postdataconfig(data)

    try {
        let response = await fetch(`${config.endpoint}/changenameprofile`, reqconf)

        let fetchres = await response.json()

        if(response.status === 200) {
            if(fetchres.status) {
                result.json = fetchres
            } else {
                result.err = fetchres.json.msg
            }
        } else {
            result.err = response.statusText
        }
    } catch(err) {
        result.err = err
    }

    return result
}

async function updatePassword(data) {
    let result = {
        err: null,
        json: null
    }

    let reqconf = config.postdataconfig(data)

    try {
        let response = await fetch(`${config.endpoint}/changepasswordaccount`, reqconf)

        let fetchres = await response.json()

        if(response.status === 200) {
            if(fetchres.status) {
                result.json = fetchres
            } else {
                result.err = fetchres.json.msg
            }
        } else {
            result.err = response.statusText
        }
    } catch(err) {
        result.err = err
    }

    return result
}

async function updateUsername(data) {
    let result = {
        err: null,
        json: null
    }

    let reqconf = config.postdataconfig(data)

    try {
        let response = await fetch(`${config.endpoint}/changeusernameaccount`, reqconf)

        let fetchres = await response.json()

        if(response.status === 200) {
            if(fetchres.status) {
                result.json = fetchres
            } else {
                result.err = fetchres.json.msg
            }
        } else {
            result.err = response.statusText
        }
    } catch(err) {
        result.err = err
    }

    return result
}

export const profiles = {
    getProfile,
    updateName,
    updatePassword,
    updateUsername
}