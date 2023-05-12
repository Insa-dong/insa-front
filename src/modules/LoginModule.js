import { createActions, handleActions } from "redux-actions";

const initialState = {};

const POST_LOGIN = 'member/POST_LOGIN';

export const { member : { postLogin }} = createActions({
    [POST_LOGIN] : res => res
})

const memberReducer = handleActions({
    [POST_LOGIN] : (state, { payload }) => ({ login : payload})
}, initialState);

export default memberReducer;