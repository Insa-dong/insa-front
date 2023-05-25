import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = {};

/* 액션 */
const GET_MYPAGE = 'mypage/GET_MYPAGE';

export const { mypage : {  getMypage } } = createActions({
    [GET_MYPAGE] : res => res
});

/* 리듀서 */
const mypageReducer = handleActions({
    [GET_MYPAGE] : (state, { payload }) => ({ mypage : payload })
}, initialState);

export default mypageReducer;
