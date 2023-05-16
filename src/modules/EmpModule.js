import { createActions, handleActions } from "redux-actions";


/* 초기값 */
const initialState = [];

/* 액션 */
const GET_EMP = 'emp/GET_EMP';

export const{emp : {getEmp}} = createActions({
    [GET_EMP] : (res) => res.data
});

/* 리듀서 */
const empReducer = handleActions(
    {
        [GET_EMP] : (state,{ payload }) => payload
    }
, initialState);

export default empReducer;