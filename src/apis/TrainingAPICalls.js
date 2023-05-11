import {getTraining, getTraininglist, putTraining} from "../modules/TrainingModule";

const RESTAPI_SERVER_IP = `${process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const RESTAPI_SERVER_PORT = `${process.env.REACT_APP_RESTAPI_SERVER_PORT}`;
const PRE_URL = `http://${RESTAPI_SERVER_IP}:${RESTAPI_SERVER_PORT}/insa/v1`;

export const callTrainingList = ({currentPage}) => {

	const requestURL = `${PRE_URL}/trainingList?page=${currentPage}`;

	return async (dispatch, getState) => {
		const result = await fetch(requestURL).then(res => res.json());

		if (result.status === 200) {
			dispatch(getTraininglist(result));
		}
	};
}

export const callTraining = ({trainingCode}) => {

	const requestURL = `${PRE_URL}/training/${trainingCode}`;

	return async (dispatch, getState) => {
		const result = await fetch(requestURL).then(res => res.json());

		if (result.status === 200) {
			dispatch(getTraining(result));
		}
	}
}

export const callModifyTraining = (form) => {
	// 	"Authorization": "Bearer " + window.localStorage.getItem('accessToken')

	const requestURL = `${PRE_URL}/training`
	return async (dispatch, getState) => {
		const result = await fetch(requestURL, {
			method: 'PUT',
			headers: {
				"Content-Type": "application/json"
			},
			body: form
		}).then(res => res.json());

		console.log(result);
		if (result.status === 200) {
			dispatch(putTraining(result));
		}
	}
}