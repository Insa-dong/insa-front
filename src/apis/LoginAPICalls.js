import { postIdsearch, postLogin, postPwsearch } from "../modules/LoginModule";


const SERVER_IP = `${process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const SERVER_PORT = `${process.env.REACT_APP_RESTAPI_SERVER_PORT}`;
const PRE_URL = `http://${SERVER_IP}:${SERVER_PORT}`;

export const callLoginAPI = (form) => {

    const requestURL = `${PRE_URL}/auth/login`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(form)
        })
        .then(response => response.json());

        console.log('[LoginAPICalls] callLoginAPI result : ', result);

        if(result.status === 200) {

            window.localStorage.setItem('accessToken', result.data.accessToken);
        }
        
        dispatch(postLogin(result));
    }
}

export const idSearchAPI = (form) => {

    const requestURL = `${PRE_URL}/auth/idsearch`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(form)
        })
        .then(response => response.json());

        console.log('[LoginAPICalls] idSearchAPI result : ', result);
        
        dispatch(postIdsearch(result));
    }
}

export const pwSearchAPI = (form) => {

    const requestURL = `${PRE_URL}/auth/sendemail`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(form)
        })
        .then(response => response.json());

        console.log('[LoginAPICalls] pwSearchAPI result : ', result);
        
        dispatch(postPwsearch(result));
    }
}


