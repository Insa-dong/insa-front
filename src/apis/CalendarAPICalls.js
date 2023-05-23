import {getCalList, putCalList} from "../modules/CalendarModule";

const RESTAPI_SERVER_IP = `${process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const RESTAPI_SERVER_PORT = `${process.env.REACT_APP_RESTAPI_SERVER_PORT}`;
const PRE_URL = `http://${RESTAPI_SERVER_IP}:${RESTAPI_SERVER_PORT}/insa/v1`;
const accessToken = window.localStorage.getItem('accessToken');

export const callMyCalListAPI = () => {

	const requestURL = `${PRE_URL}/myScheduleList`

	return async (dispatch, getState) => {

		const result = await fetch(requestURL, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
		}).then(response => response.json());


		if (result.status === 200) {
			dispatch(getCalList(result));
		}
	}
}

export const callUpdateScheduleAPI = (form) => {

	const requestURL = `${PRE_URL}/myScheduleUpdate`
	console.log('form : ', form);


	return async (dispatch, getState) => {

		const result = await fetch(requestURL, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${accessToken}`
			},
			body: JSON.stringify(form)
		}).then(response => response.json());

		if (result.status === 200) {
			dispatch(putCalList(result));
		}
	}
}