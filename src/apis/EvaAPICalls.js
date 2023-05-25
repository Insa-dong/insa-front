import { deleteEvas, postEva, putEva } from "../modules/EvaModule";
import { getEvas } from "../modules/EvaModule";

const RESTAPI_SERVER_IP = `${process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const RESTAPI_SERVER_PORT = `${process.env.REACT_APP_RESTAPI_SERVER_PORT}`;
const PRE_URL = `http://${RESTAPI_SERVER_IP}:${RESTAPI_SERVER_PORT}/insa/v1`;

export const callStudentEvaListAPI = ({ stuCode , currentPage = 1 }) => {

    const requestURL = `${PRE_URL}/students-management/eva/${stuCode}?page=${currentPage}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL).then(res => res.json());
        console.log(result);
        if(result.status === 200) {
            dispatch(getEvas(result.data));
        }
    };

}

export const callEvaDeleteForAdminAPI = ({ evaCode }) => {

    const requestURL = `${PRE_URL}/students-management/eva/${evaCode}`;
  
    return async (dispatch, getState) => {
      const result = await fetch(requestURL, {
        method: 'DELETE',
        headers: {
           "Authorization": "Bearer " + window.localStorage.getItem('accessToken')
        }
      }).then(res => res.json());
  
      console.log(result);
      if (result.status === 200) {
       dispatch(deleteEvas(result));
      }
    }
  };

  
  export const callEvaRegistAPI = (form) => {

    const requestURL =`${PRE_URL}/students/eva`;
    
    form=({...form,studyInfo:{studyInfoCode:form.studyInfoCode}, student:{stuCode:form.stuCode}});
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
            dispatch(postEva(result));
        }
    }
  };

  export const callEvaUpdateAPI = (form) => {

    const requestURL = `${PRE_URL}/students/eva`;

    form=({...form,studyInfo:{studyInfoCode:form.studyInfoCode}, student:{stuCode:form.stuCode}});
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
            dispatch(putEva(result));
        }
    }
  };