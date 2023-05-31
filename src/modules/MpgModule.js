import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = {};

/* 액션 */
const GET_MYPAGE = 'mypage/GET_MYPAGE';
const PUT_PRIVACY = 'mypage/PUT_PRIVACY';
const PUT_PWD = 'mypage/PUT_PWD';

export const { mypage : {  getMypage, putPrivacy, putPwd } } = createActions({
    [GET_MYPAGE] : res => res.data,
    [PUT_PRIVACY] : res => res,
    [PUT_PWD] : res => res
});

/* 리듀서 */
const mypageReducer = handleActions({
    [GET_MYPAGE] : (state, { payload }) => ({ info : payload }),
    [PUT_PRIVACY] : (state, { payload }) => ({ privacy : payload }),
    [PUT_PWD] : (state, { payload }) => ({ pwd : payload })
}, initialState);

export default mypageReducer;
