import { getMypage } from "../modules/MpgModule";

const RESTAPI_SERVER_IP = `${process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const RESTAPI_SERVER_PORT = `${process.env.REACT_APP_RESTAPI_SERVER_PORT}`;
const PRE_URL = `http://${RESTAPI_SERVER_IP}:${RESTAPI_SERVER_PORT}/insa/v1`;

/* 내정보 조회 API */
export const callMypageAPI = () => {

    const requestURL = `${PRE_URL}/mypage`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : 'GET',
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            }
        }).then(response => response.json());

        console.log('[MpgAPICalls] callMypageAPI result : ', result);

        if(result.status === 200) {
            dispatch(getMypage(result));
        }
    }
}
