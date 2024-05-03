import axios from 'axios'
import { toast } from 'react-toastify';
import jwt_decode from "jwt-decode";

//export const BASE_URL = 'http://cryptolink.enzo-rossi.fr/api/'
export const BASE_URL = 'http://localhost:3333/api/'
toast.configure()
export function recupererToken() {
    return localStorage.getItem('token')
}

export function deconnecter(redirect = true) {
    localStorage.removeItem('token')
    localStorage.removeItem('infoUser')
    window.location = ('/login')
}

export  function  isAuthorised(rights) {
    let isAuthorised = false
    if(rights === null || rights === undefined) {
        return isAuthorised
    }
        
    let token = recupererToken()

    if(token === null || token === undefined ) {
        return isAuthorised
    }
    let decoded = jwt_decode(token);

    if(decoded === null 
        || decoded === undefined 
        || decoded.login.rights === null 
        || decoded.login.rights === undefined  ) {
        return isAuthorised
    }

    
    decoded.login.rights.forEach(right => {
        rights.forEach(rightNeeded => {
            if( rightNeeded  === right.label ) {
                isAuthorised = true
            }
        })
    })
    return isAuthorised
}

export function clearInfoUser() {
    localStorage.removeItem('infoUser')
}

function gererErreurAxios(error) {
    if (error.response) {
        if(error.response.status === 401) 
        {
            deconnecter()
            return error.response
        }
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data)
        console.log(error.response.status)
        console.log(error.response.headers)
        return error.response
    } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request)
        return error.response
    } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message)

        return error.response
    }
}



/* -------------GET-------------- */

export async function getDataArray(url) {

    const token = recupererToken()
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    return await axios.get(`${BASE_URL}${url}`, config)
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            return gererErreurAxios(error)
        })


}

export async function getData(url) {

    const token = recupererToken()
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    return await axios.get(`${BASE_URL}${url}`, config)
        .then((response) => {
            return response.data[0]
        })
        .catch((error) => {
            return gererErreurAxios(error)
        })

}



/* ----------POST---------- */

export async function post(stringObjet, objet) {

    
    const token = recupererToken()
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };


    return await axios.post(BASE_URL + stringObjet, objet ,  config)
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            return gererErreurAxios(error)
        })
}

export async function postResetPassword(token , objet ) {

    
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };


    return await axios.post(BASE_URL + 'reset_password' , objet ,  config)
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            return gererErreurAxios(error)
        })
}


export async function postMultipart(stringObjet, objet) {

    
    const token = recupererToken()
    const config = {
        headers: 
        {
             Authorization: `Bearer ${token}`,
             'content-type': 'multipart/form-data'
        }
    };


    return await axios.post(BASE_URL + stringObjet, objet ,  config)
        .then((response) => {
            return response.status
        })
        .catch((error) => {
            return gererErreurAxios(error)
        })
}

/* -----------PUT------------- */

export async function put(stringObjet, objet) {

    const token = recupererToken()
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };


    return await axios.put(BASE_URL + stringObjet, objet , config )
        .then((response) => {
            return response.status
        })
        .catch((error) => {
            return gererErreurAxios(error)
        })

}


export async function putMultipart(stringObjet, objet) {

    const token = recupererToken()
    const config = {
        headers: 
        {
             Authorization: `Bearer ${token}`,
             'content-type': 'multipart/form-data'
        }
    };


    return await axios.put(BASE_URL + stringObjet, objet , config )
        .then((response) => {
            return response.status
        })
        .catch((error) => {
            return gererErreurAxios(error)
        })

}
/*------------ DELETE ---------------*/

export async function deleteApi (stringObjet) {


    const token = recupererToken()
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };


    return axios.delete(BASE_URL + stringObjet , config )
    .then((response) => {
        return response.data
    })
    .catch((error) => {
        return gererErreurAxios(error)
    })
}


/*------------ UTILS ---------------*/



export async function getInfoUser (hasToDisconect) {

    if( recupererToken() === undefined  || recupererToken() === null ) {
        if(hasToDisconect === true) {
            deconnecter()
            return 
        }
        else return null;
    } 
    let user = localStorage.getItem('infoUser')
    if(user !== undefined && user !== null )
    {
        return JSON.parse(user) 
    }




    const token = recupererToken()
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };


    return axios.get(BASE_URL + 'user' , config )
    .then((response) => {
        let user =  { email : response.data.email , pseudo : response.data.pseudo , avatar : response.data.avatar}
        localStorage.setItem('infoUser' ,  JSON.stringify(user))
        return response.data
    })
    .catch((error) => {
        return gererErreurAxios(error)
    })
}