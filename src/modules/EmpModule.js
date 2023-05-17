import {createActions, handleActions} from "redux-actions";


/* 초기값 */
const initialState = [];

/* 액션 */
const GET_EMP = 'emp/GET_EMP';
const GET_EMP_LIST = 'emp/GET_EMPLIST'

export const {emp: {getEmp, getEmplist}} = createActions({
	[GET_EMP]: (res) => res.data,
	[GET_EMP_LIST]: res => res.data
});

/* 리듀서 */
const empReducer = handleActions(
	{
		[GET_EMP]: (state, {payload}) => payload,
		[GET_EMP_LIST]: (state, {payload}) => ({teacher: payload})
	}
	, initialState);

export default empReducer;