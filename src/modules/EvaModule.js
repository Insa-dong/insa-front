import { createActions, handleActions } from "redux-actions";

const initialState = [];

/* 사용자 - 수강생 평가 조회, 등록, 수정, 삭제 */
const GET_EVA = 'eva/GET_EVA';
const POST_EVA = 'eva/POST_EVA';
const PUT_EVA = 'eva/PUT_EVA';
const DELETE_EVA = 'eva/DELETE_EVA';

/* 관리자 - 수강생 평가 조회, 삭제 */
const GET_EVAS = 'eva/GET_EVAS';
const DELETE_EVAS = 'eva/DELETE_EVAS';

export const { eva: { getEva, postEva, putEva, deleteEva, getEvas, deleteEvas } } = createActions({

    [GET_EVA]: res => res.data,
    [POST_EVA]: res => res,
    [PUT_EVA]: res => res,
    [DELETE_EVA]: res => res,

    [GET_EVAS]: res => res.data,
    [DELETE_EVAS]: res => res

});

const evaReducer = handleActions(
    {
        [GET_EVA]: (state, { payload }) => payload,
        [POST_EVA]: (state, { payload }) => ({ evaRegist: payload }),
        [PUT_EVA]: (state, { payload }) => ({ evaModify: payload }),
        [DELETE_EVA]: (state, { payload }) => payload,

        [GET_EVAS]: (state, { payload }) => ({ evaList: payload }),
        [DELETE_EVAS]: (state, { payload }) => ({ deleteEva : payload })

    },
    initialState
);

export default evaReducer;