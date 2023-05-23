import {
	deleteStudyinfo,
	getMyStudy,
	getStudyinfo,
	getStudyinfolist,
	postStudyinfo,
	putStudyinfo
} from "../modules/StudyInfoModule";

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
					studyMaxPeople: form.study.studyMaxPeople,
					studyCount: form.studyCount ? form.studyCount : form.study.studyCount,
					studyTimes: day,
					studyDate: form.study.studyDate,
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

export const callSelectStudyForTeacherAPI = ({empCode, currentPage = 1}) => {

	const requestURL = `${PRE_URL}/emp/teacherStudyList/${empCode}?page=${currentPage}`;

	return async (dispatch, getState) => {

		const result = await fetch(requestURL).then(res => res.json());
		console.log(result);
		if (result.status === 200) {
			dispatch(getMyStudy(result));

		}
	};
}

export const callInsertStudyInfo = ({form, day}) => {

	console.log(form);
	console.log('api day', day);

	const daysOfWeek = ['월', '화', '수', '목', '금'];

	day = day.map((date, index) => ({
		studyDate: daysOfWeek[index],
		studyStartTime: date.startTime,
		studyEndTime: date.endTime,
	})).filter(date => date.studyStartTime && date.studyEndTime)

	console.log(day);
	const requestURL = `${PRE_URL}/studyInsert`;


	return async (dispatch, getState) => {
		const result = await fetch(requestURL, {
			method: 'POST',
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Bearer " + window.localStorage.getItem('accessToken')
			},
			body: JSON.stringify({
				study: {
					studyMaxPeople: form.studyMaxPeople,
					studyCount: form.studyCount,
					studyTimes: day,
					studyDate: form.studyDate,
					training: {
						trainingCode: form.trainingCode,
						trainingTitle: form.trainingTitle
					}
				},
				studyInfoCode: form.studyInfoCode,
				studyContent: form.studyContent,
				studyRoom: form.studyRoom,
				studyTitle: form.studyTitle,
				studyInfoStartDate: form.studyInfoStartDate,
				studyInfoEndDate: form.studyInfoEndDate,
				teacher: {
					empCode: form.empCode
				}
			})
		}).then(res => res.json());

		console.log(result);
		if (result.status === 200) {
			dispatch(postStudyinfo(result));
		}
	};
}

export const callStudyRemoveAPI = (studyCode) => {

	const requestURL = `${PRE_URL}/studyInfo/${studyCode}`;

	return async (dispatch, getState) => {
		const result = await fetch(requestURL, {
			method: 'DELETE'
		}).then(res => res.json());

		console.log(result);
		if (result.status === 200) {
			dispatch(deleteStudyinfo(result));
		}
	}
}

