import { getEmp, getEmplist, getEmpDeptJob, postEmpRegist, getEmpDetail, getEmpRecord, putEmpDept, putEmpJob } from "../modules/EmpModule";

const RESTAPI_SERVER_IP = `${process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const RESTAPI_SERVER_PORT = `${process.env.REACT_APP_RESTAPI_SERVER_PORT}`;
const PRE_URL = `http://${RESTAPI_SERVER_IP}:${RESTAPI_SERVER_PORT}/insa/v1`;

/* 구성원 전체 조회 */
export const callEmpListAPI = ({ currentPage = 1 }) => {

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
export const empListDeptAPI = ({ deptCode, currentPage = 1 }) => {

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
export const empListSearchAPI = ({ searchOption, searchKeyword, currentPage = 1 }) => {

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

	const requestURL = `${PRE_URL}/emp/empregist`;
	form = ({ ...form, dept: { deptCode: form.deptCode }, job: { jobCode: form.jobCode } });
	console.log(form);


	return async (dispatch, getState) => {

		const result = await fetch(requestURL, {
			method: 'POST',
			headers: {
				"Content-Type": "application/json",
				// "Authorization": "Bearer " + window.localStorage.getItem('accessToken')
			},
			body: JSON.stringify(form)
		}).then(res => res.json());

		console.log(result);

		if (result.status === 200) {
			dispatch(postEmpRegist(result));
		}
	}
}

/* 구성원 상세 조회 */
export const callEmpDetailAPI = ({ empCode }) => {

	const requestURL = `${PRE_URL}/emp/empdetail/${empCode}`
	return async (dispatch, getState) => {

		const result = await fetch(requestURL).then(response => response.json());

		if (result.status === 200) {
			console.log('[callEmpDetailAPI] : callEmpDetailAPI result : ', result);
			dispatch(getEmpDetail(result));
		}
	}
}

/* 인사이력 조회 */
export const callEmpRecordAPI = ({ empCode, currentPage }) => {
	const requestURL = `${PRE_URL}/emp/emprecord/${empCode}?page=${currentPage}`;
	return async (dispatch, getState) => {
		const response = await fetch(requestURL);
		const result = await response.json();

		if (response.status === 200) {
			console.log('[callEmpRecordAPI] : callEmpRecordAPI result : ', result);
			dispatch(getEmpRecord(result));
		}
	};
};

/* 구성원 부서dept 이동 */
export const callUpdateDeptAPI = (form) => {

	const requestURL = `${PRE_URL}/emp/empupdatedept`;
	console.log(form);

	return async (dispatch, getState) => {

		const result = await fetch(requestURL, {
			method: 'PUT',
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(form)
		}).then(res => res.json());

		console.log(result);
        if(result.status === 200) {
            dispatch(putEmpDept(result));
        }
	}
}

/* 구성원 직책job 변경 */
export const callUpdateJobAPI = (form) => {

	const requestURL = `${PRE_URL}/emp/empupdatejob`;
	console.log(form);

	return async (dispatch, getState) => {

		const result = await fetch(requestURL, {
			method: 'PUT',
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(form)
		}).then(res => res.json());

		console.log(result);
        if(result.status === 200) {
            dispatch(putEmpJob(result));
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
