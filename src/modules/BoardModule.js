import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = [];

/* 액션 */
const GET_BOARDLIST = 'board/GET_BOARDLIST';
const POST_BOARD = 'board/POST_BOARD';
const GET_BOARD = 'board/GET_BOARD';
const PUT_BOARD = 'board/PUT_BOARD';
const DELETE_BOARD ='board/DELETE_BOARD';

export const { board : { getBoardlist, getBoardsearch, postBoard, getBoard, putBoard, deleteBoard } } = createActions({
    [GET_BOARDLIST] : res => res.data,
    [POST_BOARD] : res => res,
    [GET_BOARD] : res => res.data,
    [PUT_BOARD] : res => res,
    [DELETE_BOARD] : res => res,
});

/* 리듀서 */
const boardReducer = handleActions({
    [GET_BOARDLIST] : (state, { payload }) => payload,
    [POST_BOARD] : (state, { payload }) => ({ regist : payload }),
    [GET_BOARD] : (state, { payload }) => ({ detail : payload }),
    [PUT_BOARD] : (state, { payload }) => ({ update : payload }),
    [DELETE_BOARD] : (state, { payload }) => ({ erase : payload }),
}, initialState);

export default boardReducer;