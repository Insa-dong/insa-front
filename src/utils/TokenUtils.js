import jwt_decode from "jwt-decode";

export function decodeJwt() {
	const accessToken = window.localStorage.getItem('accessToken');
	return accessToken && jwt_decode(accessToken);
}

export function isLogin() {
	const token = decodeJwt();
	console.log('isLogin 실행')
	return !(token === undefined || token === null || token.exp * 1000 < Date.now());
}

export function isMember() {
	const token = decodeJwt();
	console.log(token.auth);
	console.log('isMember 실행')
	return (token && token.exp * 1000 > Date.now() && token.auth.filter(auth => auth === 'ROLE_MEMBER'));
}

export function isAdmin() {
	const token = decodeJwt();
	console.log(token.auth);
	console.log('isAdmin 실행')
	return (token && token.exp * 1000 > Date.now() && token.auth.filter(auth => auth === 'ROLE_ADMIN'));
}

export function isLeader() {
	const token = decodeJwt();
	console.log('isLeader 실행')
	console.log(token.auth);
	return (token && token.exp * 1000 > Date.now() && token.auth.filter(auth => auth === 'ROLE_LEADER'));
}

