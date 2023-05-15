import { createActions, handleActions } from "redux-actions";

const initialState = [];

/* 수강생 조회, 수정, 삭제 */ 
const GET_STUDENTS = 'students/GET_STUDENTS';
const POST_STUDENT = 'students/POST_STUDENT';
const GET_STUDENT = 'students/GET_STUDENT';
const PUT_STUDENT = 'students/PUT_STUDENT';
const DELETE_STUDENT = 'students/DELETE_STUDENT';
const GET_STUDENT_SEARCH = 'students/GET_STUDENT_SEARCH';

export const { students : {getStudents, postStudent, getStudent, putStudent ,deleteStudent, getStudentSearch} } = createActions({
  [GET_STUDENTS]: res => res.data,
  [POST_STUDENT] : res => res,
  [GET_STUDENT] : res => res.data,
  [PUT_STUDENT] : res => res,
  [DELETE_STUDENT] : res => res,
  [GET_STUDENT_SEARCH] : res => res.data
});

const studentReducer = handleActions(
  {
    [GET_STUDENTS]: (state, { payload }) => payload,
    [POST_STUDENT] : (state, { payload }) => ({ regist : payload }),
    [GET_STUDENT] : (state, { payload }) => payload,
    [PUT_STUDENT] : (state, { payload }) => ({ modify : payload }),
    [DELETE_STUDENT] : (state, { payload }) => payload,
    [GET_STUDENT_SEARCH] : (state, { payload }) => payload

  },
  initialState
);

export default studentReducer;
