import {createActions, handleActions} from "redux-actions";

const initialState = [];

const GET_STUDY_LIST = 'study/GET_STUDY_LIST';
const GET_STUDY = 'study/GET_STUDY';

export const {study: {getStudylist, getStudy}} = createActions({
	[GET_STUDY_LIST]: res => res.data,
	[GET_STUDY]: res => res.data
})

const studyReducer = handleActions(
	{
		[GET_STUDY]: (state, {payload}) => payload,
		[GET_STUDY_LIST]: (state, {payload}) => payload
	}, initialState
)

export default studyReducer;