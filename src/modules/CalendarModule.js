import {createActions, handleActions} from "redux-actions";

const initialState = [];

const GET_CAL_LIST = 'calendar/GET_CAL_LIST';

export const {calendar: {getCalList}} = createActions({
	[GET_CAL_LIST]: res => res.data
});

const calendarReducer = handleActions(
	{
		[GET_CAL_LIST]: (state, {payload}) => payload
	}, initialState
)

export default calendarReducer;