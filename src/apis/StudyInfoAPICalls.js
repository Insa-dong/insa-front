import {getStudyinfo, getStudyinfolist} from "../modules/StudyInfoModule";

const RESTAPI_SERVER_IP = `${process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const RESTAPI_SERVER_PORT = `${process.env.REACT_APP_RESTAPI_SERVER_PORT}`;
const PRE_URL = `http://${RESTAPI_SERVER_IP}:${RESTAPI_SERVER_PORT}/insa/v1`;

export const callStudyInfoListAPI = ({currentPage}) => {

	const requestURL = `${PRE_URL}/studyInfoList?page=${currentPage}`;

	return async (dispatch, getState) => {
		const result = await fetch(requestURL).then(res => res.json());

		if (result.status === 200) {
			dispatch(getStudyinfolist(result));
		}
	};
}

export const callStudyInfoAPI = (studyInfoCode) => {

	const requestURL = `${PRE_URL}/studyInfo/${studyInfoCode}`;

	return async (dispatch, getState) => {
		const result = await fetch(requestURL).then(res => res.json());

		console.log('result : ', result);
		if (result.status === 200) {
			dispatch(getStudyinfo(result));
		}
	};
}