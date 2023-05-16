import {createActions, handleActions} from "redux-actions";

const initialState = [];

const GET_STUDYTIME_LIST = 'studyTime/GET_STUDYTIME_LIST';

export const {studyTime: {getStudytimeList}} = createActions({
	[GET_STUDYTIME_LIST]: res => res.data
})

const studyTimeReducer = handleActions(
	{
		[GET_STUDYTIME_LIST]: (state, {payload}) => payload
	}, initialState
)

export default studyTimeReducer;