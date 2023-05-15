import { createActions, handleActions } from "redux-actions";

const initialState = {};

const POST_LOGIN = 'member/POST_LOGIN';
const RESET_LOGIN = 'member/RESET_LOGIN';
const POST_IDSEARCH = 'member/POST_IDSEARCH';
const RESET_IDSEARCH = 'member/RESET_IDSEARCH';
const POST_PWSEARCH = 'member/POST_PWSEARCH';

export const { member : { postLogin, resetLogin, postIdsearch, resetIdsearch, postPwsearch }} = createActions({
    [POST_LOGIN] : res => res,
    [RESET_LOGIN] : () => {},
    [POST_IDSEARCH] : res => res,
    [RESET_IDSEARCH] : () => {},
    [POST_PWSEARCH] : res => res
})

const memberReducer = handleActions({
    [POST_LOGIN] : (state, { payload }) => ({ login : payload}),
    [RESET_LOGIN] : (state, action) => initialState,
    [POST_IDSEARCH] : (state, { payload }) => ({ idsearch : payload }),
    [RESET_IDSEARCH] : (state, action) => initialState,
    [POST_PWSEARCH] : (state, { payload }) => ({ pwsearch : payload })
}, initialState);

export default memberReducer;