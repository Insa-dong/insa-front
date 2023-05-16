import { createActions, handleActions } from "redux-actions";

//

/* 초기값 */
const initialState = [];

/* 모든 근태 조회 */
const GET_ABSS = 'abs/GET_ABSS';
/* 내 근태 조회 */
const GET_MYABS = 'abs/GET_MYABS'
/* 출근 */
const POST_CHECKIN = 'abs/POST_CHECKIN';


export const { abs : { getAbss, getMyabs, postCheckin} } = createActions({
    [GET_ABSS] : (res) => res.data, //result의 data 값
    [GET_MYABS] : (res) => res.data,
    [POST_CHECKIN] : (res) => res
   
}); 

/* 리듀서 : 최종적으로 state를 관리한다 */
const absReducer = handleActions(
    {
        [GET_ABSS] : (state, { payload }) => payload,
        [GET_MYABS] : (state, { payload }) => payload,
        [POST_CHECKIN] : (state, { payload }) => payload
        
    }
, initialState);

export default absReducer;