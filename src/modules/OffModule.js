import { createActions, handleActions } from "redux-actions";


/* 초기값 */
const initialState = [];

/* 연차 신청 */
const POST_APPLY = 'off/POST_APPLY';

/* 예정 연차 조회 */
const GET_COMINGUP_OFF = 'off/GET_COMINGUP_OFF'



export const { off : { postApply, getComingupOff } } = createActions({
   
    [POST_APPLY] : (res) => res,
    [GET_COMINGUP_OFF] : (res) => res,
    
   
}); 

/* 리듀서 : 최종적으로 state를 관리한다 */
const offReducer = handleActions(
    {
      
      [POST_APPLY]: (state, { payload }) => payload,
      [GET_COMINGUP_OFF]: (state, { payload }) => payload
      
    },
    initialState
);
  

export default offReducer;