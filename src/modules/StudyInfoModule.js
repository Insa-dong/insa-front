import {createActions, handleActions} from "redux-actions";

const initialState = [];

const GET_STUDYINFO = 'studyInfo/GET_STUDYINFO';
const GET_STUDYINFO_LIST = 'studyInfo/GET_STUDYINFOLIST';
const PUT_STUDYINFO = 'studyInfo/PUT_STUDYINFO';

/* 사용자 강의 리스트 조회 */
const GET_MY_STUDY = 'studyInfo/GET_MY_STUDY';

export const {studyInfo: {getStudyinfolist, getStudyinfo, putStudyinfo, getMyStudy}} = createActions({
	[GET_STUDYINFO_LIST]: res => res.data,
	[GET_STUDYINFO]: res => res.data,
	[PUT_STUDYINFO]: res => res,
	
	[GET_MY_STUDY] : res => res.data
})

const studyInfoReducer = handleActions(
	{
		[GET_STUDYINFO_LIST]: (state, {payload}) => payload,
		[GET_STUDYINFO]: (state, {payload}) => payload,
		[PUT_STUDYINFO]: (state, {payload}) => ({modify: payload}),
		[GET_MY_STUDY] : (state, {payload}) => payload
	}, initialState
)

export default studyInfoReducer;