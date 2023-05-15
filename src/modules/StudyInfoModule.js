import {createActions, handleActions} from "redux-actions";

const initialState = [];

const GET_STUDYINFO = 'studyInfo/GET_STUDYINFO';
const GET_STUDYINFO_LIST = 'studyInfo/GET_STUDYINFOLIST';

export const {studyInfo: {getStudyinfolist, getStudyinfo}} = createActions({
	[GET_STUDYINFO_LIST]: res => res.data,
	[GET_STUDYINFO]: res => res.data
})

const studyInfoReducer = handleActions(
	{
		[GET_STUDYINFO_LIST]: (state, {payload}) => payload,
		[GET_STUDYINFO]: (state, {payload}) => payload
	}, initialState
)

export default studyInfoReducer;