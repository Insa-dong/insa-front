import { postAdvice, getAdvices, deleteAdvices, putAdvice } from "../modules/AdviceModule";

const RESTAPI_SERVER_IP = `${process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const RESTAPI_SERVER_PORT = `${process.env.REACT_APP_RESTAPI_SERVER_PORT}`;
const PRE_URL = `http://${RESTAPI_SERVER_IP}:${RESTAPI_SERVER_PORT}/insa/v1`;

export const callStudentAdviceListAPI = ({ stuCode , currentPage = 1 }) => {

    const requestURL = `${PRE_URL}/students-management/advice/${stuCode}?page=${currentPage}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
          },
        }).then(res => res.json());
        console.log(result);
        if(result.status === 200) {
            dispatch(getAdvices(result.data));
        }
    };

}
 
export const callAdviceDeleteForAdminAPI = ({ adviceLogCode }) => {

  const requestURL = `${PRE_URL}/students-management/advice/${adviceLogCode}`;
  
    return async (dispatch, getState) => {
      const result = await fetch(requestURL, {
        method: 'DELETE',
        headers: {
          // "Authorization": "Bearer " + window.localStorage.getItem('accessToken')
        }
      }).then(res => res.json());
  
      console.log(result);
      if (result.status === 200) {
        dispatch(deleteAdvices(result));
      }
    }
  };

  export const callAdviceWriteAPI = (form) => {
    
    const requestURL = `${PRE_URL}/students/advice`;

    form=({...form,student:{stuCode:form.stuCode}, writer:{empCode:form.empCode}});
    console.log(form);

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + window.localStorage.getItem('accessToken')
          },
          body: JSON.stringify(form),
        }).then((response) => response.json());

        if (result.status === 200) {
            console.log("[AdviceAPICalls] callAdviceWriteAPI result : ", result);
            dispatch(postAdvice(result));
          }
        };
};
     
export const callAdviceUpdateAPI = (form) => {

  const requestURL =`${PRE_URL}/students/advice`;

  form=({...form,student:{stuCode:form.stuCode}, writer:{empCode:form.empCode}});
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
          dispatch(putAdvice(result));
      }
  }
}