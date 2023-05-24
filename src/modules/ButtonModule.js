import {createActions, handleActions} from "redux-actions";

const initialState = [];

const MODIFIED_CAL_LIST = 'button/MODIFIED_CAL_LIST';
const INIT_CAL_LIST = 'button/INIT_CAL_LIST';


export const {button: {modifiedCalList, initCalList}} = createActions({
	[MODIFIED_CAL_LIST]: res => res,
	[INIT_CAL_LIST]: () => {
	}
})

const buttonReducer = handleActions(
	{
		[MODIFIED_CAL_LIST]: (state, {payload}) => {
			const copy = [...state];
			const number = copy.findIndex(sche => {
				console.log(sche);
				console.log(payload);
				return sche.calCode === payload.calCode
			});
			console.log(number)
			console.log(copy)
			if (number > -1) {
				copy[number] = payload;
			} else {
				copy.push(payload);
			}
			return (copy)
		},
		[INIT_CAL_LIST]: () => initialState
	}, initialState
)

export default buttonReducer;