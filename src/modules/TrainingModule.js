// noinspection SpellCheckingInspection

import {createActions, handleActions} from "redux-actions";

const initialState = [];

const GET_TRAINING = 'training/GET_TRAINING';
const GET_TRAINING_LIST = 'training/GET_TRAININGLIST';
const PUT_TRAINING = 'training/PUT_TRAINING';
const POST_TRAINING = 'training/POST_TRAINING';
const INIT_TRAINING = 'training/INIT_TRAINING';

export const {training: {getTraining, getTraininglist, putTraining, postTraining, initTraining}} = createActions({
	[GET_TRAINING]: res => res.data,
	[GET_TRAINING_LIST]: res => res.data,
	[PUT_TRAINING]: res => res,
	[POST_TRAINING]: res => res,
	[INIT_TRAINING]: () => {
	}
})

const trainingReducer = handleActions(
	{
		[GET_TRAINING]: (state, {payload}) => payload,
		[GET_TRAINING_LIST]: (state, {payload}) => payload,
		[PUT_TRAINING]: (state, {payload}) => ({modify: payload}),
		[POST_TRAINING]: (state, {payload}) => ({regist: payload}),
		[INIT_TRAINING]: () => initialState
	}, initialState
)

export default trainingReducer;