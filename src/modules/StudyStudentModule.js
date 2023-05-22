import { createActions, handleActions } from "redux-actions";

const initialState = [];

const GET_STUDY_STUDENT = 'studystu/GET_STUDY_STUDENT';

/* 관리자 - 수강생 강의 삭제 */
const DELETE_STUDY_STUDENTS = 'studystu/DELETE_STUDY_STUDENTS';
const POST_STUDY_STUDENTS = 'studystu/POST_STUDY_STUDENTS';
/* 관리자 - 수강생 과정 목록 조회 */
const GET_STUDY_STUDENTS = 'studystu/GET_STUDY_STUDENTS';
const PUT_STUDY_STUDENTS = 'studystu/PUT_STUDY_STUDENTS';

export const { studystu: { getStudyStudent, deleteStudyStudents, postStudyStudents,  getStudyStudents, putStudyStudents} } = createActions({

    [GET_STUDY_STUDENT]: res => res.data,
    [DELETE_STUDY_STUDENTS] : res => res,
    [POST_STUDY_STUDENTS] : res => res,
    [GET_STUDY_STUDENTS] : res => res.data,
    [PUT_STUDY_STUDENTS] : res => res

});

const studyStudentReducer = handleActions(
    {
        [GET_STUDY_STUDENT]: (state, { payload }) => ({ studyList: payload }),
        [DELETE_STUDY_STUDENTS] : (state, { payload }) => payload,
        [POST_STUDY_STUDENTS] : (state, { payload }) => ({ registStudyStudent: payload }),
        [GET_STUDY_STUDENTS] : (state, { payload }) =>  ({ trainingList: payload }),
        [PUT_STUDY_STUDENTS] : (state, { payload }) => ({ modify : payload })

    },
    initialState
);

export default studyStudentReducer;

