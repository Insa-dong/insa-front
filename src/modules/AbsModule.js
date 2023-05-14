import { createActions, handleActions } from "redux-actions";

//

/* 초기값 */
const initialState = [];

/* 액션 */
const GET_ABSS = 'abs/GET_ABSS';


export const { abs : { getAbss} } = createActions({
    [GET_ABSS] : (res) => res.data, //result의 data 값
   
}); 

/* 리듀서 : 최종적으로 state를 관리한다 */
const absReducer = handleActions(
    {
        [GET_ABSS] : (state, { payload }) => payload,
        
    }
, initialState);

export default absReducer;