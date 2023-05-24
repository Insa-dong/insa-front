import {createActions, handleActions} from "redux-actions";

const initialState = [];
const scheduleList = [];

const MODIFIED_CAL_LIST = 'button/MODIFIED_CAL_LIST';

export const {button: {modifiedCalList}} = createActions({
	[MODIFIED_CAL_LIST]: res => res
})

const buttonReducer = handleActions(
	{
		[MODIFIED_CAL_LIST]: (state, {payload}) => {
			console.log('state', state);
			console.log('payload', payload);
			const number = scheduleList.findIndex(sche => sche.calCode === payload.calCode);
			if (number > -1) {
				scheduleList[number] = payload;
			} else {
				scheduleList.push(payload);
			}
			return ({...state, scheduleList})
		}
	}, initialState
)

export default buttonReducer;