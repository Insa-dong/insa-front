import {createActions, handleActions} from "redux-actions";

const initialState = [];

const GET_CAL_LIST = 'calendar/GET_CAL_LIST';
const PUT_CAL_LIST = 'calendar/PUT_CAL_LIST';
const PUT_CALENDAR = 'calendar/PUT_CALENDAR';
const POST_CALENDAR = 'calendar/POST_CALENDAR';
const DELETE_CALENDAR = 'calendar/DELETE_CALENDAR'

export const {calendar: {getCalList, putCalList, putCalendar, postCalendar, deleteCalendar}} = createActions({
	[GET_CAL_LIST]: res => res.data,
	[PUT_CAL_LIST]: res => res,
	[PUT_CALENDAR]: res => res,
	[POST_CALENDAR]: res => res,
	[DELETE_CALENDAR]: res => res
});

const calendarReducer = handleActions(
	{
		[GET_CAL_LIST]: (state, {payload}) => ({calList: payload}),
		[PUT_CAL_LIST]: (state, {payload}) => ({modify: payload}),
		[PUT_CALENDAR]: (state, {payload}) => ({calInfo: payload}),
		[POST_CALENDAR]: (state, {payload}) => ({regist: payload}),
		[DELETE_CALENDAR]: (state, {payload}) => ({remove: payload})
	}, initialState
)

export default calendarReducer;