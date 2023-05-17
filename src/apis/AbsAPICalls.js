import { getAbss, putAbss, getAbsDate, getMyabs, postCheckin } from "../modules/AbsModule";


const SERVER_IP = `${process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const SERVER_PORT = `${process.env.REACT_APP_RESTAPI_SERVER_PORT}`;
const PRE_URL = `http://${SERVER_IP}:${SERVER_PORT}/abs`;



/* 모든 근태 목록 조회 */
export const callAbsListAPI = ({ currentPage = 1 }) => {

    const requestURL = `${PRE_URL}/abs-admin?page=${currentPage}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL).then(response => response.json());

        if (result.status === 200) {
            console.log('[callAbsListAPI] : callAbsListAPI result : ', result.data);
            dispatch(getAbss(result));
        }
    }
}


/* 근태 수정  */
export const callModifyAbsAPI = (formData) => {
    console.log(formData);

    const requestURL = `${PRE_URL}/abs-admin`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: 'PUT',
            headers: {
                "Authorization": "Bearer " + window.localStorage.getItem('accessToken')
            },
            body: formData
        }).then(response => response.json());

        if (result.status === 200) {
            console.log('[callModifyAbsAPI] callModifyAbsAPI result :', result);
            dispatch(putAbss(result));
        }
    }

};



/* 모든 근태 날짜 조회 */
export const callAbsDateAPI = ({ absDate, currentPage = 1 }) => {

    const requestURL = `${PRE_URL}/abs-admin/${absDate}?page=${currentPage}`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL).then(response => response.json());

        if (result.status === 200) {
            dispatch(getAbsDate(result));
        }
    };
};

/* 내 근태 조회 */
export const callMyAbsListAPI = ({ empCode, currentPage = 1 }) => {

    const requestUR = `${PRE_URL}/abs-myAbs?empCode=${empCode}&page=${currentPage}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestUR).then(response => response.json());

        if (result.status === 200) {
            dispatch(getMyabs(result));
        }
    }
}

/* 출근하기 API 호출 */
export const callCheckInAPI = () => {
    const requestURL = `${PRE_URL}/checkIn`;

    return async (dispatch, getState) => {
        const accessToken = window.localStorage.getItem('accessToken');
        const loggedInUser = getState().auth.user;

        const result = await fetch(requestURL, {
            method: 'POST',
            headers: {
                "Authorization": "Bearer " + accessToken,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                empCode: loggedInUser.empCode
            })
        }).then(response => response.json());

        if (result.status === 200) {
            // 결과를 전달하면서 액션 객체 생성
            dispatch(postCheckin(result));
        }
    };
};







