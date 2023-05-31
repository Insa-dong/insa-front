import { getStudents, postStudent, getStudent, putStudent, deleteStudent, getStudentSearch } from "../modules/StudentModule";

const RESTAPI_SERVER_IP = `${process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const RESTAPI_SERVER_PORT = `${process.env.REACT_APP_RESTAPI_SERVER_PORT}`;
const PRE_URL = `http://${RESTAPI_SERVER_IP}:${RESTAPI_SERVER_PORT}/insa/v1`;

export const callStudentListAPI = ({currentPage = 1}) => {

    const requestURL = `${PRE_URL}/students-management?page=${currentPage}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL).then(res => res.json());

        if(result.status === 200) {
            dispatch(getStudents(result));
        }
    };
}

export const callStudentDetailForAdminAPI = ({ stuCode }) => {

    const requestURL = `${PRE_URL}/students-management/${stuCode}`;

   
    return async (dispatch, getState) => {

        const result = await fetch(requestURL).then(res => res.json());
        console.log(result);
        if(result.status === 200) {
            dispatch(getStudent(result));
        }
    };
}

export const callStudentRegistAPI = (form) => {

    const requestURL =`${PRE_URL}/student`;
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
            dispatch(postStudent(result));
        }
    }
}


export const callStudentUpdateAPI = (formData) => {
    
    const requestURL =`${PRE_URL}/students`;
    console.log(formData);

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : 'PUT',
            headers : {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + window.localStorage.getItem('accessToken')
            },
            body: JSON.stringify(formData)
        }).then(res => res.json());
        
        console.log(result);
        if(result.status === 200) {
            dispatch(putStudent(result));
        }
    }
}

export const callStudentDeleteAPI = (stuCode) => {

    const requestURL = `${PRE_URL}/students/${stuCode}`;
  
    return async (dispatch, getState) => {
      const result = await fetch(requestURL, {
        method: 'DELETE',
        headers: {
            "Authorization": "Bearer " + window.localStorage.getItem('accessToken')
        }
      }).then(res => res.json());
  
      console.log(result);
      if (result.status === 200) {
        dispatch(deleteStudent(result));
      }
    };
  };
  
  export const callStudentSearchListAPI = ({ search, currentPage = 1}) => {

    const requestURL = `${PRE_URL}/students/search?search=${search}&page=${currentPage}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL).then(response => response.json());

        if(result.status === 200) {
            console.log("[StudentAPICalls] callStudentSearchListAPI result : ", result);
            dispatch(getStudentSearch(result));
        }
    }
}
