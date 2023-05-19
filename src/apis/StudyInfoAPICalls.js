import {getStudyinfo, getStudyinfolist, putStudyinfo} from "../modules/StudyInfoModule";

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

		if (result.status === 200) {
			dispatch(getStudyinfo(result));
		}
	};
}

export const callPetiteStudyInfoAPI = (studyInfoCode) => {

	const requestURL = `${PRE_URL}/PetiteStudyInfo/${studyInfoCode}`;

	return async (dispatch, getState) => {
		const result = await fetch(requestURL).then(res => res.json());

		if (result.status === 200) {
			dispatch(getStudyinfo(result));
		}
	};
}


export const callModifyStudyInfo = ({form, day, studyInfoCode}) => {

	console.log(form);
	console.log('api day', day);
	const date1 = new Date(`2022-02-12 ${day[0].startTime}`);
	console.log(date1);

	const daysOfWeek = ['월', '화', '수', '목', '금'];

	day = day.filter(date => date.startTime && date.endTime)
		.map((date, index) => ({
			studyCode: form.study.studyCode,
			studyDate: daysOfWeek[index],
			studyStartTime: new Date(`2022-02-12 ${date.startTime}`),
			studyEndTime: new Date(`2022-02-12 ${date.endTime}`),
		}))

	console.log(day);
	const requestURL = `${PRE_URL}/studyInfo/${studyInfoCode}`;


	return async (dispatch, getState) => {
		const result = await fetch(requestURL, {
			method: 'PUT',
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Bearer " + window.localStorage.getItem('accessToken')
			},
			body: JSON.stringify({
				study: {
					studyCode: form.study.studyCode,
					studyDeleteYn: form.study.studyDeleteYn,
					studyStartDate: form.study.studyStartDate,
					studyEndDate: form.study.studyEndDate,
					studyMaxPeople: form.study.studyMaxPeople,
					studyTimes: day,
					training: {
						trainingCode: form.study.training.trainingCode,
						trainingCount: form.study.training.trainingCount,
						trainingTitle: form.study.training.trainingTitle
					}
				},
				studyInfoCode: form.studyInfoCode,
				studyContent: form.studyContent,
				studyRoom: form.studyRoom,
				studyTitle: form.studyTitle,
				studyInfoStartDate: form.studyInfoStartDate,
				studyInfoEndDate: form.studyInfoEndDate,
				teacher: {
					empCode: form.teacher.empCode,
					empName: form.teacher.empName
				}
			})
		}).then(res => res.json());

		console.log(result);
		if (result.status === 200) {
			dispatch(putStudyinfo(result));
		}
	};
}