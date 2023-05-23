import {createActions, handleActions} from "redux-actions";

const initialState = [];

const GET_CAL_LIST = 'calendar/GET_CAL_LIST';
const PUT_CAL_LIST = 'calendar/PUT_CAL_LIST'

export const {calendar: {getCalList, putCalList}} = createActions({
	[GET_CAL_LIST]: res => res.data,
	[PUT_CAL_LIST]: res => res
});

const calendarReducer = handleActions(
	{
		[GET_CAL_LIST]: (state, {payload}) => payload,
		[PUT_CAL_LIST]: (state, {payload}) => ({modify: payload})
	}, initialState
)

export default calendarReducer;