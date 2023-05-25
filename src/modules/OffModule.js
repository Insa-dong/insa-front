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
/* 연차 신청 취소(삭제) */
const DELETE_OFF = 'off/DELETE_OFF'
/* 연차 신청 내역 조회 */
const GET_SIGN_OFF = 'off/GET_SIGN_OFF'



export const { off : { postApply, getOffNow, getComingupOff, getPastOff, deleteOff, getSignOff } } = createActions({
   
    [POST_APPLY] : (res) => res,
    [GET_OFF_NOW] : (res) => res.data,
    [GET_COMINGUP_OFF] : (res) => res.data,
    [GET_PAST_OFF] : (res) => res.data,
    [DELETE_OFF] : (res) => res,
    [GET_SIGN_OFF] :  (res) => res.data,
    
   
}); 

/* 리듀서 : 최종적으로 state를 관리한다 */
const offReducer = handleActions(
    {
      
      [POST_APPLY]: (state, { payload }) => ({ postApply: payload }),
      [GET_OFF_NOW]: (state, { payload }) => ({ ...state, offNow: payload }),
      [GET_COMINGUP_OFF]: (state, { payload }) => ({ ...state, comingUpOffList: payload }),
      [GET_PAST_OFF]: (state, { payload }) => ({ ...state, pastOffList: payload }),
      [DELETE_OFF]: (state, { payload }) => {
        const newState = {...state};  // 현재 상태 복사
        newState.comingUpOffList = newState.comingUpOffList.filter(off => off.signCode !== payload.signCode);  // 신청취소한 연차 제거
        return newState;  // 새로운 상태 반환
      },
      [GET_SIGN_OFF]: (state, { payload }) => ({ ...state, signOff: payload }),
      
    },
    initialState
);
  

export default offReducer;