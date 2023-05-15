import { getAbss } from "../modules/AbsModule";


 const SERVER_IP = `${process.env.REACT_APP_RESTAPI_SERVER_IP}`;
 const SERVER_PORT = `${process.env.REACT_APP_RESTAPI_SERVER_PORT}`;
 const PRE_URL = `http://${SERVER_IP}:${SERVER_PORT}/abs`;

export const callAbsListAPI = ({ currentPage = 1 }) => {

    const requestURL = `${PRE_URL}/abs-admin?page=${currentPage}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL).then(response => response.json());

        if(result.status === 200) {
            dispatch(getAbss(result));
        }
    }
}