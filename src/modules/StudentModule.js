import { createActions, handleActions } from "redux-actions";

const initialState = [];

const GET_STUDENTS = 'students/GET_STUDENTS';

export const { students : {getStudents} } = createActions({
  [GET_STUDENTS]: res => res.data
});

const studentReducer = handleActions(
  {
    [GET_STUDENTS]: (state, { payload }) => payload
  },
  initialState
);

export default studentReducer;
