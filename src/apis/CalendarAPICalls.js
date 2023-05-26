import {getCalList, putCalendar, putCalList} from "../modules/CalendarModule";

const RESTAPI_SERVER_IP = `${process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const RESTAPI_SERVER_PORT = `${process.env.REACT_APP_RESTAPI_SERVER_PORT}`;
const PRE_URL = `http://${RESTAPI_SERVER_IP}:${RESTAPI_SERVER_PORT}/insa/v1`;

export const callMyCalListAPI = () => {

	const requestURL = `${PRE_URL}/myScheduleList`

	return async (dispatch, getState) => {

		const result = await fetch(requestURL, {
			method: "GET",
			headers: {
				"Authorization": "Bearer " + window.localStorage.getItem('accessToken')
			}
		}).then(response => response.json());


		if (result.status === 200) {
			dispatch(getCalList(result));
		}
	}
}

export const callUpdateScheduleAPI = (form) => {

	const requestURL = `${PRE_URL}/myScheduleUpdate`
	console.log(form);

	return async (dispatch, getState) => {

		const result = await fetch(requestURL, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(form)
		}).then(response => response.json());

		if (result.status === 200) {
			dispatch(putCalList(result));
		}
	}
}

export const callUpdateScheduleInfoAPI = (form) => {

	const requestURL = `${PRE_URL}/myScheduleInfoUpdate`
	console.log(form);

	return async (dispatch, getState) => {

		const result = await fetch(requestURL, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(form)
		}).then(response => response.json());

		if (result.status === 200) {
			dispatch(putCalendar(result));
		}
	}
}