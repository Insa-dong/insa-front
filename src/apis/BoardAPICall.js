import { getBoardlist } from "../modules/BoardModule";

const RESTAPI_SERVER_IP = `${process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const RESTAPI_SERVER_PORT = `${process.env.REACT_APP_RESTAPI_SERVER_PORT}`;
const PRE_URL = `http://${RESTAPI_SERVER_IP}:${RESTAPI_SERVER_PORT}/insa/v1`;


export const callBoardListAPI = ({ currentPage = 1 }) => {

	const requestURL = `${PRE_URL}/noticelist?page=${currentPage}`

	return async (dispatch, getState) => {

		const result = await fetch(requestURL).then(response => response.json());

        
		if (result.status === 200) {
            console.log('[BoardAPICalls] : callBoardListAPI result : ', result);
            dispatch(getBoardlist(result));
            
		}
	}
}

export const callBoardSearchAPI = ({ searchOption, searchKeyword, currentPage = 1 }) => {

	const requestURL = `${PRE_URL}/noticesearch?page=${currentPage}&searchOption=${searchOption}&searchKeyword=${searchKeyword}`

	return async (dispatch, getState) => {

		const result = await fetch(requestURL).then(response => response.json());

		if (result.status === 200) {
			console.log('[BoardAPICalls] : callBoardSearchAPI result : ', result);
			dispatch(getBoardlist(result));
		}

	}
}