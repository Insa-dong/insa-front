import {postLogin} from "../modules/LoginModule";


const SERVER_IP = `${process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const SERVER_PORT = `${process.env.REACT_APP_RESTAPI_SERVER_PORT}`;
const PRE_URL = `http://${SERVER_IP}:${SERVER_PORT}`;

export const callLoginAPI = (form) => {

	const requestURL = `${PRE_URL}/auth/login`;

	return async (dispatch, getState) => {

		console.log('form : ', form);
		const result = await fetch(requestURL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(form)
		})
			.then(response => response.json());

		console.log('[MemberAPICalls] callLoginAPI result : ', result);

		if (result.status === 200) {

			window.localStorage.setItem('accessToken', result.data.accessToken);
		}

		dispatch(postLogin(result));
	}
}
