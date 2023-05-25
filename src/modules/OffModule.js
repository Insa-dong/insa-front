import { createActions, handleActions } from "redux-actions";


/* 초기값 */
const initialState = [];


//액션
/* 연차 신청 */
const POST_APPLY = 'off/POST_APPLY';
/* 연차 현황 조회 */
const GET_OFF_NOW = 'off/GET_OFF_NOW'
/* 예정 연차 조회 */
const GET_COMINGUP_OFF = 'off/GET_COMINGUP_OFF'
/* 연차 사용 내역 조회 */
const GET_PAST_OFF = 'off/GET_PAST_OFF'



export const { off : { postApply, getOffNow, getComingupOff, getPastOff } } = createActions({
   
    [POST_APPLY] : (res) => res,
    [GET_OFF_NOW] : (res) => res.data,
    [GET_COMINGUP_OFF] : (res) => res.data,
    [GET_PAST_OFF] : (res) => res.data,
    
   
}); 

/* 리듀서 : 최종적으로 state를 관리한다 */
const offReducer = handleActions(
    {
      
      [POST_APPLY]: (state, { payload }) => ({ postApply: payload }),
      [GET_OFF_NOW]: (state, { payload }) => ({ ...state, offNow: payload }),
      [GET_COMINGUP_OFF]: (state, { payload }) => ({ ...state, comingUpOffList: payload }),
      [GET_PAST_OFF]: (state, { payload }) => ({ ...state, pastOffList: payload }),
      
    },
    initialState
);
  

export default offReducer;