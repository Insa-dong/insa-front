import {getStudytimeList} from "../modules/StudyTimeModule";

const RESTAPI_SERVER_IP = `${process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const RESTAPI_SERVER_PORT = `${process.env.REACT_APP_RESTAPI_SERVER_PORT}`;
const PRE_URL = `http://${RESTAPI_SERVER_IP}:${RESTAPI_SERVER_PORT}/insa/v1`;


export const callStudyTimeListAPI = (studyInfoCode) => {

	const requestURL = `${PRE_URL}/studyTimeList/${studyInfoCode}`;

	return async (dispatch, getState) => {
		const result = await fetch(requestURL).then(res => res.json());

		console.log(result);
		if (result.status === 200) {
			dispatch(getStudytimeList(result));
		}
	};
}
