import { getEmp } from "../modules/EmpModule";

const RESTAPI_SERVER_IP = `${process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const RESTAPI_SERVER_PORT = `${process.env.REACT_APP_RESTAPI_SERVER_PORT}`;
const PRE_URL = `http://${RESTAPI_SERVER_IP}:${RESTAPI_SERVER_PORT}/insa/v1`;

/* 구성원 전체 조회 */
export const callEmpListAPI = ({ currentPage = 1 }) => {

    const requestURL = `${PRE_URL}/emp?page=${currentPage}`
    return async (dispatch, getState) => {

        const result = await fetch(requestURL).then(response => response.json());

        if(result.status === 200){
            console.log('[EmpAPICalls] : callEmpListAPI result : ', result);
            dispatch(getEmp(result));
        }
    }
}

/* 구성원 부서별 조회 */
export const empListDeptAPI = ({ deptCode, currentPage = 1 }) => {

    const requestURL = `${PRE_URL}/emp/dept/${deptCode}?page=${currentPage}`;
    return async (dispatch, getState) => {

        const result = await fetch(requestURL).then(response => response.json());

        if(result.status === 200){
            console.log('[EmpAPICalls] : empListDeptAPI result : ', result);
            dispatch(getEmp(result));
        }

    }
}