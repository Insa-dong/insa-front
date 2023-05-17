import { createActions, handleActions } from "redux-actions";

const initialState = [];

/* 사용자 - 수강생 상담일지 조회, 수정, 삭제 */
const GET_ADVICE = 'advice/GET_ADVICE';
const POST_ADVICE = 'advice/POST_ADVICE';
const PUT_ADVICE = 'advice/PUT_ADVICE';
const DELETE_ADVICE = 'advice/DELETE_ADVICE';

/* 관리자 - 수강생 상담일지 조회, 삭제 */
const GET_ADVICES = 'advice/GET_ADVICES';
const DELETE_ADVICES = 'advice/DELETE_ADVICES';

export const { advice: { getAdvice, postAdvice, putAdvice, deleteAdvice, getAdvices, deleteAdvices } } = createActions({
    [GET_ADVICE]: res => res.data,
    [POST_ADVICE]: res => res,
    [PUT_ADVICE]: res => res,
    [DELETE_ADVICE]: res => res,

    [GET_ADVICES]: res => res.data,
    [DELETE_ADVICES]: res => res

});

const adviceReducer = handleActions(
    {
        [GET_ADVICE]: (state, { payload }) => payload,
        [POST_ADVICE]: (state, { payload }) => ({ adviceRegist: payload }),
        [PUT_ADVICE]: (state, { payload }) => ({ adviceModify: payload }),
        [DELETE_ADVICE]: (state, { payload }) => payload,

        [GET_ADVICES]: (state, { payload }) => ({ adviceList: payload }),
        [DELETE_ADVICES]: (state, { payload }) => payload
    },
    initialState
);

export default adviceReducer;