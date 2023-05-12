// noinspection SpellCheckingInspection

import {createActions, handleActions} from "redux-actions";

const initialState = [];

const GET_TRAINING = 'training/GET_TRAINING';
const GET_TRAINING_LIST = 'training/GET_TRAININGLIST';
const PUT_TRAINING = 'training/PUT_TRAINING';
const POST_TRAINING = 'training/POST_TRAINING';

export const {training: {getTraining, getTraininglist, putTraining, postTraining}} = createActions({
	[GET_TRAINING]: res => res.data,
	[GET_TRAINING_LIST]: res => res.data,
	[PUT_TRAINING]: res => res,
	[POST_TRAINING]: res => res
})

const trainingReducer = handleActions(
	{
		[GET_TRAINING]: (state, {payload}) => payload,
		[GET_TRAINING_LIST]: (state, {payload}) => payload,
		[PUT_TRAINING]: (state, {payload}) => ({modify: payload}),
		[POST_TRAINING]: (state, {payload}) => ({regist: payload})
	}, initialState
)

export default trainingReducer;