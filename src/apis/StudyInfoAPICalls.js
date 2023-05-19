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

	const daysOfWeek = ['월', '화', '수', '목', '금'];

	day = day.map((date, index) => ({
		studyCode: form.study.studyCode,
		studyDate: daysOfWeek[index],
		studyStartTime: date.startTime,
		studyEndTime: date.endTime,
	})).filter(date => date.studyStartTime && date.studyEndTime)

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
					studyCount: form.studyCount ? form.studyCount : form.study.studyCount,
					studyTimes: day,
					training: {
						trainingCode: form.trainingCode ? form.trainingCode : form.study.training.trainingCode,
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
					empCode: form.empCode ? form.empCode : form.teacher.empCode,
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