import {createActions, handleActions} from "redux-actions";

const initialState = [];

const GET_CAL_PAGING = 'calendar/GET_CAL_PAGING';

export const {calendar: {getCalPaging}} = createActions({
	[GET_CAL_PAGING]: res => res.data
});

const calendarPagingReducer = handleActions(
	{
		[GET_CAL_PAGING]: (state, {payload}) => ({page: payload}),
	}, initialState
)

export default calendarPagingReducer;