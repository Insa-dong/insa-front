import {createActions, handleActions} from "redux-actions";

const initialState = [];

const GET_STUDYINFO = 'studyInfo/GET_STUDYINFO';
const GET_STUDYINFO_LIST = 'studyInfo/GET_STUDYINFOLIST';
const PUT_STUDYINFO = 'studyInfo/PUT_STUDYINFO';
const POST_STUDYINFO = 'studyInfo/POST_STUDYINFO';
const DELETE_STUDYINFO = 'studyInfo/DELETE_STUDYINFO';
const GET_MY_STUDY = 'studyInfo/GET_MY_STUDY';
const GET_STUDYINFO_SEARCHLIST = 'studyInfo/GET_STUDYINFO_SEARCHLIST';

export const {
	studyInfo: {
		getStudyinfolist,
		getStudyinfoSearchlist,
		getStudyinfo,
		putStudyinfo,
		getMyStudy,
		postStudyinfo,
		deleteStudyinfo,
	}
} = createActions({
	[GET_STUDYINFO_LIST]: res => res.data,
	[GET_STUDYINFO]: res => res.data,
	[PUT_STUDYINFO]: res => res,
	[POST_STUDYINFO]: res => res,
	[DELETE_STUDYINFO]: res => res,
	[GET_MY_STUDY]: res => res.data,
	[GET_STUDYINFO_SEARCHLIST]: res => res.data,
});

const studyInfoReducer = handleActions(
	{
		[GET_STUDYINFO_LIST]: (state, {payload}) => payload,
		[GET_STUDYINFO]: (state, {payload}) => payload,
		[PUT_STUDYINFO]: (state, {payload}) => ({modify: payload}),
		[POST_STUDYINFO]: (state, {payload}) => ({regist: payload}),
		[GET_MY_STUDY]: (state, {payload}) => payload,
		[DELETE_STUDYINFO]: (state, {payload}) => ({remove: payload}),
		[GET_STUDYINFO_SEARCHLIST]: (state, {payload}) => payload,
	}, initialState
)

export default studyInfoReducer;