import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = [];

/* 액션 */
const GET_BOARDLIST = 'board/GET_BOARDLIST';
const POST_BOARD = 'board/POST_BOARD';

export const { board : { getBoardlist, getBoardsearch, postBoard } } = createActions({
    [GET_BOARDLIST] : res => res.data,
    [POST_BOARD] : res => res.data
});

/* 리듀서 */
const boardReducer = handleActions({
    [GET_BOARDLIST] : (state, { payload }) => payload,
    [POST_BOARD] : (state, { payload }) => payload
}, initialState);

export default boardReducer;