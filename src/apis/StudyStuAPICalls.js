import { deleteStudyStudents, getStudyStudent, postStudyStudents, getStudyStudents, putStudyStudents, getStudyStudentList, getStudyStudentAttend } from "../modules/StudyStudentModule";

const RESTAPI_SERVER_IP = `${process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const RESTAPI_SERVER_PORT = `${process.env.REACT_APP_RESTAPI_SERVER_PORT}`;
const PRE_URL = `http://${RESTAPI_SERVER_IP}:${RESTAPI_SERVER_PORT}/insa/v1`;

export const callStudyStuListAPI = ({ stuCode , currentPage = 1 }) => {

    const requestURL = `${PRE_URL}/students-management/study/${stuCode}?page=${currentPage}`;

    return async (dispatch, getState) => {
        
        const result = await fetch(requestURL).then(res => res.json());
        console.log(result);
        if(result.status === 200) {
            dispatch(getStudyStudent(result.data));

        }
    };

}

export const callStudyStuDeleteAdminAPI = (stuCode) => {

   const requestURL = `${PRE_URL}/students-management/study/${stuCode}`;
  
    return async (dispatch, getState) => {
      const result = await fetch(requestURL, {
        method: 'DELETE',
        headers: {
          // "Authorization": "Bearer " + window.localStorage.getItem('accessToken')
        }
      }).then(res => res.json());
  
      console.log(result);
      if (result.status === 200) {
        dispatch(deleteStudyStudents(result));
      }
    }
  };

  export const callStudyStuRegistAdminAPI = (form) => {

    console.log(form);
    const requestURL =`${PRE_URL}/students-management/study`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : 'POST',
            headers : {
                "Content-Type": "application/json",
                // "Authorization": "Bearer " + window.localStorage.getItem('accessToken')
            },
            body: JSON.stringify(form)
        }).then(res => res.json());
        
        console.log(result);
        if(result.status === 200) {
            dispatch(postStudyStudents(result));
        }
    }

  }


export const callStudyStuTrainingTitleListAPI = () => {

    const requestURL = `${PRE_URL}/students-management/studylist`;

    return async (dispatch, getState) => {
        
        const result = await fetch(requestURL).then(res => res.json());
        console.log(result);
        if(result.status === 200) {
            dispatch(getStudyStudents(result));

        }
    };

}

export const callStudyStuUpdateForAdminAPI = (form) => {
  
  const requestURL =`${PRE_URL}/students-management/study`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : 'PUT',
            headers : {
                "Content-Type": "application/json",
                // "Authorization": "Bearer " + window.localStorage.getItem('accessToken')
            },
            body: JSON.stringify(form)
        }).then(res => res.json());
        
        console.log(result);
        if(result.status === 200) {
            dispatch(putStudyStudents(result));
        }
    }
}

export const callSelectStudentForStudyAPI = ({ studyCode , currentPage = 1 }) => {

    const requestURL = `${PRE_URL}/students/study/${studyCode}?page=${currentPage}`;

    return async (dispatch, getState) => {
        
        const result = await fetch(requestURL).then(res => res.json());
        console.log(result);
        if(result.status === 200) {
            dispatch(getStudyStudentList(result));

        }
    };
}

export const callSelectStudentAndAttendAPI = ({ studyCode, currentPage = 1}) => {

    const requestURL = `${PRE_URL}/studyAndAttend/${studyCode}?page=${currentPage}`;

    return async (dispatch, getState) => {
        
        const result = await fetch(requestURL).then(res => res.json());
        console.log(result);
        if(result.status === 200) {
            dispatch(getStudyStudentAttend(result));

        }
    };
}