import { createActions, handleActions } from "redux-actions";

const initialState = {};

const POST_LOGIN = 'member/POST_LOGIN';
const RESET_LOGIN = 'member/RESET_LOGIN';
const POST_IDSEARCH = 'member/POST_IDSEARCH';
const RESET_IDSEARCH = 'member/RESET_IDSEARCH'

export const { member : { postLogin, resetLogin, postIdsearch, resetIdsearch }} = createActions({
    [POST_LOGIN] : res => res,
    [RESET_LOGIN] : () => {},
    [POST_IDSEARCH] : res => res,
    [RESET_IDSEARCH] : () => {}
})

const memberReducer = handleActions({
    [POST_LOGIN] : (state, { payload }) => ({ login : payload}),
    [RESET_LOGIN] : (state, action) => initialState,
    [POST_IDSEARCH] : (state, { payload }) => ({ idsearch : payload }),
    [RESET_IDSEARCH] : (state, action) => initialState
}, initialState);

export default memberReducer;