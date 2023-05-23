import { createActions, handleActions } from "redux-actions";

const initialState = [];

/* 출결 조회 */
const GET_ATTEND = 'attend/GET_ATTEND';
/* 출결 등록 */
const POST_ATTEND = 'attend/POST_ATTEND';
/* 출결 수정 */
const PUT_ATTEND = 'attend/PUT_ATTEND';
/* 출결 삭제 */
const DELETE_ATTEND = 'attend/DELETE_ATTEND';


export const { attend : { getAttend, postAttend, putAttend, deleteAttend } } = createActions({
    [GET_ATTEND] : res => res.data ,
    [POST_ATTEND] : res => res,
    [PUT_ATTEND] : res => res,
    [DELETE_ATTEND] : res => res

});

const attendReducer = handleActions(
 
 {
    [GET_ATTEND] : (state, { payload } ) => ({ attend : payload }),
    [POST_ATTEND] : (state, { payload } ) => ({ regist : payload }),
    [PUT_ATTEND] : (state, { payload }) => ({ update : payload }),
    [DELETE_ATTEND] : (state, { payload }) => ({ delete : payload })

},initialState
    

);

export default attendReducer;