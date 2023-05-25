import {createActions, handleActions} from "redux-actions";


/* 초기값 */
const initialState = [];

/* 액션 */
const GET_EMP = 'emp/GET_EMP';
const GET_EMP_DEPT_JOB = 'emp/GET_EMP_DEPT_JOB';
const POST_EMP_REGIST = 'emp/POST_EMP_REGIST';
const GET_EMP_DETAIL = 'emp/GET_EMP_DETAIL';
const GET_EMP_RECORD = 'emp/GET_EMP_RECORD';
const PUT_EMP_DEPT = 'emp/PUT_EMP_DEPT';
const PUT_EMP_JOB = 'emp/PUT_EMP_JOB';

const GET_EMP_LIST = 'emp/GET_EMPLIST'

export const { emp: { getEmp, getEmpDeptJob, postEmpRegist, getEmpDetail, getEmpRecord, putEmpDept, putEmpJob, getEmplist } } = createActions({
	[GET_EMP]: (res) => res.data,
	[GET_EMP_DEPT_JOB]: (res) => res.data,
	[POST_EMP_REGIST]: (res) => res,
	[GET_EMP_DETAIL]: (res) => res.data,
	[GET_EMP_RECORD]: (res) => res.data,
	[PUT_EMP_DEPT]: (res) => res,
	[PUT_EMP_JOB]: (res) => res,

	[GET_EMP_LIST]: res => res.data
	
});

/* 리듀서 */
const empReducer = handleActions(
	{
		[GET_EMP]: (state, {payload}) => payload,
		[GET_EMP_DEPT_JOB]: (state, {payload}) =>({ ...state, empDeptJob : payload}) ,
		[POST_EMP_REGIST]: (state, {payload}) => ({ empRegist : payload}),
		[GET_EMP_DETAIL]: (state, {payload}) => ({ empDetail : payload}),
		[GET_EMP_RECORD]: (state, {payload}) => ({ ...state, empRecord : payload}),
		[PUT_EMP_DEPT]: (state, {payload}) => ({...state, result : payload}),
		[PUT_EMP_JOB]: (state, {payload}) => ({...state, result : payload}),

		[GET_EMP_LIST]: (state, {payload}) => ({teacher: payload})
	}
	, initialState);

export default empReducer;