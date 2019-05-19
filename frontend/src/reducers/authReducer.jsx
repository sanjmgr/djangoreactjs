import { AUTH_START, AUTH_SUCCESS, AUTH_FAIL, AUTH_LOGOUT } from '../actions/types';

const initialState = {
	token: null,
	error: null,
	isAuthenticated: false,
	isLoading: false,
};

export default function(state = initialState, action) {
	switch (action.type) {
		case AUTH_START:
			return {
				...state,
				error: null,
				isLoading: true,
			};
		case AUTH_SUCCESS:
			return {
				...state,
				token: action.payload,
				isAuthenticated: true,
				isLoading: false,
				error: null,
			};
		case AUTH_FAIL:
			return {
				...state,
				error: action.payload,
				isAuthenticated: false,
				isLoading: false,
			};
		case AUTH_LOGOUT:
			return {
				...state,
				isAuthenticated: false,
				token: null,
			};
		default:
			return state;
	}
}
