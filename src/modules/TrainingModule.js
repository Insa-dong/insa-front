// noinspection SpellCheckingInspection

import {createActions, handleActions} from "redux-actions";

const initialState = [];

const GET_TRAINING = 'training/GET_TRAINING';
const GET_TRAINING_LIST = 'training/GET_TRAININGLIST';
const PUT_TRAINING = 'training/PUT_TRAINING';

export const {training: {getTraining, getTraininglist, putTraining}} = createActions({
	[GET_TRAINING]: res => res.data,
	[GET_TRAINING_LIST]: res => res.data,
	[PUT_TRAINING]: res => res
})

const trainingReducer = handleActions(
	{
		[GET_TRAINING]: (state, {payload}) => payload,
		[GET_TRAINING_LIST]: (state, {payload}) => payload,
		[PUT_TRAINING]: (state, {payload}) => ({modify: payload})
	}, initialState
)

export default trainingReducer;