import {getEmp, getEmplist, getEmpDeptJob, postEmpRegist} from "../modules/EmpModule";

const RESTAPI_SERVER_IP = `${process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const RESTAPI_SERVER_PORT = `${process.env.REACT_APP_RESTAPI_SERVER_PORT}`;
const PRE_URL = `http://${RESTAPI_SERVER_IP}:${RESTAPI_SERVER_PORT}/insa/v1`;

/* 구성원 전체 조회 */
export const callEmpListAPI = ({currentPage = 1}) => {

	const requestURL = `${PRE_URL}/emp?page=${currentPage}`
	return async (dispatch, getState) => {

		const result = await fetch(requestURL).then(response => response.json());

		if (result.status === 200) {
			console.log('[EmpAPICalls] : callEmpListAPI result : ', result);
			dispatch(getEmp(result));
		}
	}
}

/* 구성원 부서별 조회 */
export const empListDeptAPI = ({deptCode, currentPage = 1}) => {

	const requestURL = `${PRE_URL}/emp/dept/${deptCode}?page=${currentPage}`;
	return async (dispatch, getState) => {

		const result = await fetch(requestURL).then(response => response.json());

		if (result.status === 200) {
			console.log('[EmpAPICalls] : empListDeptAPI result : ', result);
			dispatch(getEmp(result));
		}

	}
}

/* 구성원 검색*/
export const empListSearchAPI = ({searchOption, searchKeyword, currentPage = 1}) => {

	const requestURL = `${PRE_URL}/empsearch?page=${currentPage}&searchOption=${searchOption}&searchKeyword=${searchKeyword}`;
	return async (dispatch, getState) => {

		const result = await fetch(requestURL).then(response => response.json());

		if (result.status === 200) {
			console.log('[EmpAPICalls] : empListDeptAPI result : ', result);
			dispatch(getEmp(result));
		}

	}
}

/* 구성원 부서 직책 조회 */
export const empDeptJobListAPI = () => {

	const requestURL = `${PRE_URL}/emp/deptjoblist`;
	return async (dispatch, getState) => {

		const result = await fetch(requestURL).then(response => response.json());

		if (result.status === 200) {
			console.log('[EmpAPICalls] : empDeptJobListAPI result : ', result);
			dispatch(getEmpDeptJob(result));
		}

	}
}

/* 구성원 등록 */
export const callEmpRegistAPI = (form) => {

	const requestURL =`${PRE_URL}/emp/empregist`;
	form.dept.deptCode = form.deptCode;
	form.job.jobCode = form.jobCode;
    console.log(form);

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : 'POST',
            headers : {
                "Content-Type": "application/json",
                // "Authorization": "Bearer " + window.localStorage.getItem('accessToken')
            },
            body: JSON.stringify(form)
        }).then(res => res.json());
        
        console.log(result);
        if(result.status === 200) {
            dispatch(postEmpRegist(result));
        }
    }
}


/* 강사 조회 */
export const callTeacherList = () => {

	const requestURL = `${PRE_URL}/emp/teacher`;
	return async (dispatch, getState) => {

		const result = await fetch(requestURL).then(response => response.json());

		if (result.status === 200) {
			console.log(result);
			dispatch(getEmplist(result));
		}

	}
}
