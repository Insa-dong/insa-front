import {deleteCalendar, getCalList, postCalendar, putCalendar, putCalList} from "../modules/CalendarModule";
import {getCalPaging} from "../modules/CalendarPagingModule";

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

export const callMyPagingCalListAPI = ({currentPage, sort}) => {

	switch (sort) {
		case 0 :
			sort = 'calCode';
			break;
		case 1 :
			sort = 'calStartDate';
			break;
		case 2 :
			sort = 'calEndDate';
			break;
		default :
			sort = 'calCode';
	}

	const requestURL = `${PRE_URL}/myPagingScheduleList?page=${currentPage}&sort=${sort}`

	return async (dispatch, getState) => {

		const result = await fetch(requestURL, {
			method: "GET",
			headers: {
				"Authorization": "Bearer " + window.localStorage.getItem('accessToken')
			}
		}).then(response => response.json());


		if (result.status === 200) {
			dispatch(getCalPaging(result));
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
	console.log('form : ', form);
	if (form.calEndDate === "Invalid Date") {
		form.calEndDate = form.calStartDate;
	}

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
	};
}

export const callInsertScheduleAPI = (form) => {

	const requestURL = `${PRE_URL}/mySchedule`

	return async (dispatch, getState) => {

		const result = await fetch(requestURL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Bearer " + window.localStorage.getItem('accessToken')
			},
			body: JSON.stringify(form)
		}).then(response => response.json());

		if (result.status === 200) {
			dispatch(postCalendar(result));
		}
	}
}

export const callDeleteScheduleAPI = (codeList) => {

	const requestURL = `${PRE_URL}/mySchedule`

	return async (dispatch, getState) => {

		const result = await fetch(requestURL, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(codeList)
		}).then(response => response.json());

		if (result.status === 200) {
			dispatch(deleteCalendar(result));
		}
	}
}