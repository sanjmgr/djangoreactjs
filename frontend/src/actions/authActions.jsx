import axios from 'axios';
import {
	START_LOGIN,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	START_REGISTERATION,
	REGISTRATION_SUCCESS,
	REGISTRATION_FAIL,
	LOGOUT,
} from './types';

export const loginStart = () => {
	return {
		type: START_LOGIN,
	};
};
export const registrationStart = () => {
	return {
		type: START_REGISTERATION,
	};
};

export const loginSuccess = token => {
	return {
		type: LOGIN_SUCCESS,
		payload: token,
	};
};

export const registrationSuccess = token => {
	return {
		type: REGISTRATION_SUCCESS,
		payload: token,
	};
};

export const loginFail = token => {
	return {
		type: LOGIN_FAIL,
		payload: error,
	};
};

export const registrationFail = token => {
	return {
		type: REGISTRATION_FAIL,
		payload: error,
	};
};

export const logout = () => {
	localStorage.removeItem('token');
	localStorage.removeItem('expirationDate');
	return {
		type: LOGOUT,
	};
};

export const checkAuthTimeOut = expirationDate => dispatch => {
	setTimeout(() => {
		dispatch(logout());
	}, expirationDate * 1000);
};

export const authLogin = (username, password) => dispatch => {
	dispatch(loginStart());
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
			dispatch(loginSuccess(token));
			dispatch(checkAuthTimeOut(3600));
		})
		.catch(err => dispatch(loginFail(err)));
};

export const authRegistration = (email, username, password1, password2) => dispatch => {
	dispatch(registrationStart());
	let data = {
		email,
		username,
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
			dispatch(registrationSuccess(token));
			dispatch(checkAuthTimeOut(3600));
		})
		.catch(err => dispatch(registrationFail(err)));
};

export const authCheckState = () => {
	return dispatch => {
		const token = localStorage.getItem('token');
		if (token === undefined) {
			dispatch(logout());
		} else {
			const expirationDate = new Date(localStorage.getItem('expirationDate'));
			if (expirationDate <= new Date()) {
				dispatch(logout());
			} else {
				dispatch(loginSuccess(token));
				dispatch(checkAuthTimeOut((expirationDate.getTime() - new Date().getTime()) / 1000));
			}
		}
	};
};
