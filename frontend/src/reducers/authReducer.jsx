import {
	START_LOGIN,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	START_REGISTERATION,
	REGISTRATION_SUCCESS,
	REGISTRATION_FAIL,
	LOGOUT,
} from '../actions/types';

const initialState = {
	token: null,
	error: null,
	isAuthenticated: false,
	isLoading: false,
};

export default function(state = initialState, action) {
	switch (action.type) {
		case START_LOGIN:
		case START_REGISTERATION:
			return {
				...state,
				error: null,
				isLoading: true,
			};
		case LOGIN_SUCCESS:
		case REGISTRATION_SUCCESS:
			return {
				...state,
				token: action.payload,
				isAuthenticated: true,
				isLoading: false,
				error: null,
			};
		case LOGIN_FAIL:
		case REGISTRATION_FAIL:
			return {
				...state,
				error: action.payload,
				isAuthenticated: false,
				isLoading: false,
			};
		case LOGOUT:
			return {
				...state,
				isAuthenticated: false,
				token: null,
			};
		default:
			return state;
	}
}
