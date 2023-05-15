import { createActions, handleActions } from "redux-actions";

//

/* 초기값 */
const initialState = [];

/* 액션 */
const GET_ABSS = 'abs/GET_ABSS';
const GET_MYABS = 'abs/GET_MYABS'
const POST_CHECKIN = 'abs/OST_CHECKIN';


export const { abs : { getAbss, getMyAbs, postCheckin} } = createActions({
    [GET_ABSS] : (res) => res.data, //result의 data 값
    [GET_MYABS] : (res) => res.data,
    [POST_CHECKIN] : (res) => res.data
   
}); 

/* 리듀서 : 최종적으로 state를 관리한다 */
const absReducer = handleActions(
    {
        [GET_ABSS] : (state, { payload }) => ({ abss : payload }),
        [GET_MYABS] : (state, { payload }) => ({ myabs : payload }),
        [POST_CHECKIN] : (state, { payload }) => ({ checkin : payload })
        
    }
, initialState);

export default absReducer;