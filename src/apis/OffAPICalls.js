import { postApply, getComingupOff } from "../modules/OffModule";

const SERVER_IP = `${process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const SERVER_PORT = `${process.env.REACT_APP_RESTAPI_SERVER_PORT}`;
const PRE_URL = `http://${SERVER_IP}:${SERVER_PORT}/off`;

/* 연차 신청 API */
export const callApplyAPI = (formData) => {
    const requestURL = `${PRE_URL}/apply`;
  
    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : 'POST',
            headers : {
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            },
            body : formData
        }).then(response => response.json());

        if(result.status === 200) {
            console.log('[OffAPICalls] : callApplyAPI result : ', result);
            dispatch(postApply(result));
        }
    }
  };

  /* 예정 연차 조회 API */
  export const callComingupOffListAPI = () => {

    const requestURL = `${PRE_URL}/my-comingUp-off`;
    
    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + window.localStorage.getItem('accessToken')
            }
        }).then(response => response.json());

        console.log('Server response:', result);  // 서버 응답 출력

        if(result.status === 200) {
            dispatch(getComingupOff(result));
        }
    }
};