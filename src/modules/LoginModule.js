import { createActions, handleActions } from "redux-actions";

const initialState = {};

const POST_LOGIN = 'member/POST_LOGIN';
const RESET_LOGIN = 'member/RESET_LOGIN';

export const { member : { postLogin, resetLogin }} = createActions({
    [POST_LOGIN] : res => res,
    [RESET_LOGIN] : () => {}
})

const memberReducer = handleActions({
    [POST_LOGIN] : (state, { payload }) => ({ login : payload}),
    [RESET_LOGIN] : (state, action) => initialState
}, initialState);

export default memberReducer;