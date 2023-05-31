import { getEmp, getEmplist, getEmpDeptJob, postEmpRegist, getEmpDetail, getEmpRecord, putEmpDept, putEmpJob, putEmpDel, postEmpRestRegist, putRestState, getEmpRest } from "../modules/EmpModule";

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
		if (result.status === 200) {
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
		if (result.status === 200) {
			dispatch(putEmpJob(result));
		}
	}
}

/* 구성원 퇴사 */
export const callEmpDelAPI = ({ empCode }) => {
	const requestURL = `${PRE_URL}/emp/empdelete/${empCode}`;

	return async (dispatch, getState) => {
		const result = await fetch(requestURL, {
			method: 'PUT',
			headers: {
				"Content-Type": "application/json",
			}
		}).then(res => res.json());

		console.log(result);

		if (result.status === 200) {
			dispatch(putEmpDel(result));
		}
	}
}

/* 구성원 휴직 신청 */
export const callEmpRestRegistAPI = (form) => {

	const requestURL = `${PRE_URL}/emp/emprestregist`;
	console.log(form);

	return async (dispatch, getState) => {

		const result = await fetch(requestURL, {
			method: 'POST',
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(form)
		}).then(res => res.json());

		console.log(result);

		if (result.status === 200) {
			dispatch(postEmpRestRegist(result));
		}
	}
}

/* 휴직 내역 */
export const callEmpRestList = ({ currentPage = 1 }) => {
	const requestURL = `${PRE_URL}/emp/emprestlist?page=${currentPage}`; // 현재 페이지를 URL에 포함시킴

	return async (dispatch, getState) => {
		const result = await fetch(requestURL).then(response => response.json());

		if (result.status === 200) {
			// console.log('[callEmpRestList] : callEmpRestList result : ', result);
			dispatch(getEmpRest(result));
		}
	}
}

/* 휴직 승인 반려 */
export const callUpdateRestStateAPI = (form) => {

	const requestURL = `${PRE_URL}/emp/empreststate`;
	console.log(form);

	return async (dispatch, getState) => {

		const result = await fetch(requestURL, {
			method: 'PUT',
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(form)
		}).then(res => res.json());

		// console.log(result);
		if (result.status === 200) {
			dispatch(putRestState(result));
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
