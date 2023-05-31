import { deleteAttend, getAttend, getAttendDate, getAttends, postAttend, putAttend } from "../modules/AttendModule";

const RESTAPI_SERVER_IP = `${process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const RESTAPI_SERVER_PORT = `${process.env.REACT_APP_RESTAPI_SERVER_PORT}`;
const PRE_URL = `http://${RESTAPI_SERVER_IP}:${RESTAPI_SERVER_PORT}/insa/v1`;

export const callStudentAttendAPI = ({ studyCode, currentPage = 1 }) => {

    const requestURL = `${PRE_URL}/students/attend/${studyCode}?page=${currentPage}`;

    return async (dispatch, getState) => {
        
        const result = await fetch(requestURL).then(res => res.json());
        console.log(result);
        if(result.status === 200) {
            dispatch(getAttend(result));

        }
    };
}

export const callStudentAttendDetailAPI = ({ stuCode, currentPage = 1 }) => {

    const requestURL = `${PRE_URL}/students/attendDetail/${stuCode}?page=${currentPage}`;

    return async (dispatch, getState) => {
        
        const result = await fetch(requestURL).then(res => res.json());
        console.log(result);
        if(result.status === 200) {
            dispatch(getAttends(result.data));

        }
    };
}

export const callStudentAttendRegistAPI = (form) => {
    const requestURL =`${PRE_URL}/students/attend`;

    form=({...form,study:{studyCode:form.studyCode}, student:{stuCode:form.stuCode}});
    console.log(form);

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : 'POST',
            headers : {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + window.localStorage.getItem('accessToken')
            },
            body: JSON.stringify(form)
        }).then(res => res.json());
        
        console.log(result);
        if(result.status === 200) {
            dispatch(postAttend(result));
        }
    }
 }

 export const callStudentAttendUpdateAPI = (form) => {
    
    const requestURL = `${PRE_URL}/students/attend`;
    
    form=({...form,study:{studyCode:form.studyCode}, student:{stuCode:form.stuCode}});
    console.log(form);

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : 'PUT',
            headers : {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + window.localStorage.getItem('accessToken')
            },
            body: JSON.stringify(form)
        }).then(res => res.json());
        
        console.log(result);
        if(result.status === 200) {
            dispatch(putAttend(result));
        }
    }
 }

 export const callStudentAttendDeleteAPI = ({ attendCode }) => {

    const requestURL = `${PRE_URL}/students/attend/${attendCode}`;
   
    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
          method: 'DELETE',
          headers: {
            "Authorization": "Bearer " + window.localStorage.getItem('accessToken')
          }
        }).then(res => res.json());
    
        console.log(result);
        if (result.status === 200) {
          dispatch(deleteAttend(result));
        }
      }
 }

 export const callStudentAttendSearchAPI = ({ studyCode, attendDate, currentPage= 1 }) => {

   const requestURL = `${PRE_URL}/studyAndAttend/${studyCode}/student-attends/${attendDate}?page=${currentPage}`;

    return async (dispatch, getState) => {
        
        const result = await fetch(requestURL).then(res => res.json());
        console.log(result);
        if(result.status === 200) {
            dispatch(getAttendDate(result));

        }
    };

}