import {createActions, handleActions} from "redux-actions";

const initialState = [];

const GET_STUDYINFO = 'studyInfo/GET_STUDYINFO';
const GET_STUDYINFO_LIST = 'studyInfo/GET_STUDYINFOLIST';
const PUT_STUDYINFO = 'studyInfo/PUT_STUDYINFO';

export const {studyInfo: {getStudyinfolist, getStudyinfo, putStudyinfo}} = createActions({
	[GET_STUDYINFO_LIST]: res => res.data,
	[GET_STUDYINFO]: res => res.data,
	[PUT_STUDYINFO]: res => res
})

const studyInfoReducer = handleActions(
	{
		[GET_STUDYINFO_LIST]: (state, {payload}) => payload,
		[GET_STUDYINFO]: (state, {payload}) => payload,
		[PUT_STUDYINFO]: (state, {payload}) => ({modify: payload})
	}, initialState
)

export default studyInfoReducer;