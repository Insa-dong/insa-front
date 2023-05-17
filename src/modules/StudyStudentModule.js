import { createActions, handleActions } from "redux-actions";

const initialState = [];

const GET_STUDY_STUDENT = 'studystu/GET_STUDY_STUDENT';

export const { studystu: { getStudyStudent } } = createActions({

    [GET_STUDY_STUDENT]: res => res.data

});

const studyStudentReducer = handleActions(
    {
        [GET_STUDY_STUDENT]: (state, { payload }) => ({ studyList: payload }),

    },
    initialState
);

export default studyStudentReducer;

