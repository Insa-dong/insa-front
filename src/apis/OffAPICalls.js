import { postApply, getComingupOff } from "../modules/OffModule";

const SERVER_IP = `${process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const SERVER_PORT = `${process.env.REACT_APP_RESTAPI_SERVER_PORT}`;
const PRE_URL = `http://${SERVER_IP}:${SERVER_PORT}/off`;

/* 연차 신청 API */
export const callApplyAPI = ({offStart, offEnd, signReason, offDiv}) => {
    const requestURL = `${PRE_URL}/apply`;
  
    return async (dispatch, getState) => {
      try {
        const response = await fetch(requestURL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + window.localStorage.getItem('accessToken')
          },
          body: JSON.stringify({
            offStart: new Date(offStart), 
            offEnd : new Date(offEnd), 
            signReason, 
            offDiv
            })
        });
  
        if (response.ok) {
            const result = await response.json();
            dispatch(postApply(result));
    
            // 연차 신청 성공 후 예정 연차 조회 API를 다시 호출
            dispatch(callComingupOffListAPI());
          } else {
            throw new Error('API 호출이 실패하였습니다.');
          }
        } catch (error) {
          console.error('API 호출 에러:', error);
          // 오류 처리를 원하는 대로 수행
        }
      };
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