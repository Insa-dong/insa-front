import {createActions, handleActions} from "redux-actions";

const initialState = [];

const GET_CAL_LIST = 'calendar/GET_CAL_LIST';
const PUT_CAL_LIST = 'calendar/PUT_CAL_LIST';
const PUT_CALENDAR = 'calendar/PUT_CALENDAR';

export const {calendar: {getCalList, putCalList, putCalendar}} = createActions({
	[GET_CAL_LIST]: res => res.data,
	[PUT_CAL_LIST]: res => res,
	[PUT_CALENDAR]: res => res,
});

const calendarReducer = handleActions(
	{
		[GET_CAL_LIST]: (state, {payload}) => ({calList: payload}),
		[PUT_CAL_LIST]: (state, {payload}) => ({modify: payload}),
		[PUT_CALENDAR]: (state, {payload}) => ({calInfo: payload})
	}, initialState
)

export default calendarReducer;