// noinspection SpellCheckingInspection

import {createActions, handleActions} from "redux-actions";

const initialState = [];

const GET_TRAINING_LIST = 'training/GET_TRAININGLIST';

export const {training: {getTraininglist}} = createActions({
	[GET_TRAINING_LIST]: res => res.data
})

const trainingReducer = handleActions(
	{
		[GET_TRAINING_LIST]: (state, {payload}) => payload
	}, initialState
)

export default trainingReducer;