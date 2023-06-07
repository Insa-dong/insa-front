import {
    postApply, getOffNow, getComingupOff, getPastOff, getOffDetail,
    deleteOff, getTeamOff, getSignOff, putSignOff, getAdminOff
} from "../modules/OffModule";

const SERVER_IP = `${process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const SERVER_PORT = `${process.env.REACT_APP_RESTAPI_SERVER_PORT}`;
const PRE_URL = `http://${SERVER_IP}:${SERVER_PORT}/off`;

/* 연차 신청 API */
export const callApplyAPI = (form) => {
    const requestURL = `${PRE_URL}/apply`;

    console.log(form);

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + window.localStorage.getItem('accessToken')
            },
            body: JSON.stringify(form)
        }).then(res => res.json());

        console.log(result);

        if (result.status === 200) {
            dispatch(postApply(result));
            dispatch(callComingupOffListAPI());
            dispatch(callPastOffListAPI());
            dispatch(callOffNowAPI());
        }
    }
}

/* 연차 현황 API */
export const callOffNowAPI = () => {

    const requestURL = `${PRE_URL}/myOff`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + window.localStorage.getItem('accessToken')
            }
        }).then(response => response.json());

        console.log(result);

        if (result.status === 200) {
            dispatch(getOffNow(result));
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

        if (result.status === 200) {
            dispatch(getComingupOff(result));
            return result.data;
        } else {
            return [];  // 상태 코드가 200이 아닌 경우 빈 배열 반환
        }
    }
};

/* 연차 사용 기록 조회 API */
export const callPastOffListAPI = (year) => {

    let requestURL = `${PRE_URL}/my-past-off`;

    if (year) {
        requestURL += `?year=${year}`;
    }

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + window.localStorage.getItem('accessToken')
            }
        }).then(response => response.json());

        console.log('Server response:', result);  // 서버 응답 출력

        if (result.status === 200) {
            dispatch(getPastOff(result));
        }
    }
};

/* 연차 상세 조회 API */
export const callOffDetailAPI = ({ signCode }) => {

    const requestURL = `${PRE_URL}/myOffDetail/${signCode}`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + window.localStorage.getItem('accessToken')
            }
        }).then(response => response.json());

        console.log('Server response:', result);  // 서버 응답 출력

        if (result.status === 200) {
            dispatch(getOffDetail(result));
        }
    }
};

/* 연차 신청 취소(삭제) API */
export const callCencelOffAPI = ({ signCode }) => {

    const requestURL = `${PRE_URL}/cancelOff/${signCode}`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + window.localStorage.getItem('accessToken')
            }
        }).then(response => response.json());

        console.log('Server response:', result);  // 서버 응답 출력

        if (result.status === 200) {
            dispatch(deleteOff(result));
            dispatch(callComingupOffListAPI());
            dispatch(callComingupOffListAPI());
            dispatch(callOffNowAPI());
        }
    }
};

/* 팀원 연차 현황 조회 API */

export const callTeamOffListAPI = ({ currentPage, searchOption, searchKeyword }) => {
   
    let requestURL = `${PRE_URL}/teamOff?page=${currentPage}&searchOption=${searchOption}&searchKeyword=${searchKeyword}`;
    
    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + window.localStorage.getItem('accessToken')
            }
        }).then(response => response.json());

        console.log('Server response:', result);

        if (result.status === 200) {
            dispatch(getTeamOff(result));
        }
    }
}

/* 연차 신청 내용 API */
export const callSignOffListAPI = ({ currentPage, searchOption, searchKeyword }) => {

    //let requestURL = `${PRE_URL}/mySignOff?page=${currentPage}&searchOption=${searchOption}&searchKeyword=${searchKeyword}`;
    let requestURL = `${PRE_URL}/mySignOff?page=${currentPage}`;

    // 검색 옵션과 키워드가 빈 문자열이 아니면 URL에 추가
    if (searchOption) {
        requestURL += `&searchOption=${searchOption}`;
    }
    if (searchKeyword) {
        requestURL += `&searchKeyword=${searchKeyword}`;
    }

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + window.localStorage.getItem('accessToken')
            }
        }).then(response => response.json());

        console.log('Server response:', result);

        if (result.status === 200) {
            dispatch(getSignOff(result));
        }
    }
};

/* 연차 승인 처리 API */
export const callSignApplyAPI = (form, signCode) => {
    const requestURL = `${PRE_URL}/mySignOff/${signCode}`;


    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + window.localStorage.getItem('accessToken')
            },
            body: JSON.stringify(form)
        }).then(response => response.json());

        console.log('Server response:', result);

        if (result.status === 200) {
            dispatch(putSignOff(result));

        }
    }
};

/* 구성원 연차 현황 조회 API */

export const callAdminOffListAPI = ({ currentPage, searchOption, searchKeyword }) => {
   
    let requestURL = `${PRE_URL}/adminOff?page=${currentPage}&searchOption=${searchOption}&searchKeyword=${searchKeyword}`;
    
    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + window.localStorage.getItem('accessToken')
            }
        }).then(response => response.json());

        console.log('Server response:', result);

        if (result.status === 200) {
            dispatch(getAdminOff(result));
        }
    }
}

