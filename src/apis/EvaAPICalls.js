import { deleteEvas } from "../modules/EvaModule";
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

export const callEvaDeleteForAdminAPI = (stuCode) => {

    const requestURL = `${PRE_URL}/students-management/eva/${stuCode}`;
  
    return async (dispatch, getState) => {
      const result = await fetch(requestURL, {
        method: 'DELETE',
        headers: {
          // "Authorization": "Bearer " + window.localStorage.getItem('accessToken')
        }
      }).then(res => res.json());
  
      console.log(result);
      if (result.status === 200) {
        dispatch(deleteEvas(result));
      }
    }
  };
