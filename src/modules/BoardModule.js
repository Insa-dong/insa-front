import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = [];

/* 액션 */
const GET_BOARDLIST = 'board/GET_BOARDLIST';

export const { board : { getBoardlist } } = createActions({
    [GET_BOARDLIST] : res => res.data
});

/* 리듀서 */
const boardReducer = handleActions({
    [GET_BOARDLIST] : (state, { payload }) => payload
}, initialState);

export default boardReducer;