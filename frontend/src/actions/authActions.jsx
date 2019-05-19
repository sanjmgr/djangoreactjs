import axios from 'axios';
import { AUTH_START, AUTH_SUCCESS, AUTH_FAIL, AUTH_LOGOUT } from './types';

export const authStart = () => {
	return {
		type: AUTH_START,
	};
};

export const authSuccess = token => {
	return {
		type: AUTH_SUCCESS,
		payload: token,
	};
};

export const authFail = error => {
	return {
		type: AUTH_FAIL,
		payload: error,
	};
};

export const logout = () => {
	localStorage.removeItem('token');
	localStorage.removeItem('expirationDate');
	return {
		type: AUTH_LOGOUT,
	};
};

export const checkAuthTimeOut = expirationDate => dispatch => {
	setTimeout(() => {
		dispatch(logout());
	}, expirationDate * 1000);
};

export const authLogin = (username, password) => dispatch => {
	dispatch(authStart());
	let data = {
		username,
		password,
	};
	axios
		.post('http://127.0.0.1:8000/rest-auth/login/', data)
		.then(res => {
			const token = res.data.key;
			const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
			localStorage.setItem('token', token);
			localStorage.setItem('expirationDate', expirationDate);
			dispatch(authSuccess(token));
			dispatch(checkAuthTimeOut(3600));
		})
		.catch(err => dispatch(authFail(err)));
};

export const authRegistration = (username, email, password1, password2) => dispatch => {
	dispatch(authStart());
	let data = {
		username,
		email,
		password1,
		password2,
	};
	axios
		.post('http://127.0.0.1:8000/rest-auth/registration/', data)
		.then(res => {
			const token = res.data.key;
			const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
			localStorage.setItem('token', token);
			localStorage.setItem('expirationDate', expirationDate);
			dispatch(authSuccess(token));
			dispatch(checkAuthTimeOut(3600));
		})
		.catch(err => dispatch(authFail(err)));
};

export const authCheckState = () => dispatch => {
	const token = localStorage.getItem('token');
	if (token === undefined) {
		dispatch(logout());
	} else {
		const expirationDate = new Date(localStorage.getItem('expirationDate'));
		if (expirationDate <= new Date()) {
			dispatch(logout());
		} else {
			dispatch(authSuccess(token));
			dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
		}
	}
};
