import { createActions, handleActions } from "redux-actions";

//

/* 초기값 */
const initialState = [];

/* 모든 근태 조회 */
const GET_ABSS = 'abs/GET_ABSS';

/* 근태 수정 */
const PUT_ABSS = 'abs/PUT_ABSS';

/* 모든 근태 날짜 조회 */
const GET_ABS_DATE = 'abs/GET_ABS_DATE'
/* 내 근태 조회 */
const GET_MYABS = 'abs/GET_MYABS'
/* 출근 */
const POST_CHECKIN = 'abs/POST_CHECKIN';


export const { abs : { getAbss, putAbss, getAbsDate, getMyabs, postCheckin} } = createActions({
    [GET_ABSS] : (res) => res.data, //result의 data 값
    [PUT_ABSS] : (res) => res.data,
    [GET_ABS_DATE] : (res) => res.data,
    [GET_MYABS] : (res) => res.data,
    [POST_CHECKIN] : (res) => res
   
}); 

/* 리듀서 : 최종적으로 state를 관리한다 */
const absReducer = handleActions(
    {
      [GET_ABSS]: (state, { payload }) => payload,
      [PUT_ABSS]: (state, { payload }) => {
        // 기존의 state에서 수정된 근태 정보만을 업데이트
        const updatedState = state.map((abs) => {
          if (abs.absCode === payload.absCode) {
            return payload;
          }
          return abs;
        });
        return updatedState;
      },
      [GET_ABS_DATE]: (state, { payload }) => payload,
      [GET_MYABS]: (state, { payload }) => payload,
      [POST_CHECKIN]: (state, { payload }) => payload,
    },
    initialState
  );
  

export default absReducer;