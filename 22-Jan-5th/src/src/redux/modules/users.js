import axios from "axios";

const prefix = "middleware/users";

export function sleep(ms) {
	return new Promise(resolve => {
		setTimeout(_ => { resolve() }, ms);
	});
}

/* NON-MIDDLEWARE AREA ---------------------------------------------------------------------------------------------- */

const GET_USERS_START = `${prefix}/GET_USERS_START`;
const GET_USERS_SUCCESS = `${prefix}/GET_USERS_SUCCESS`;
const GET_USERS_FAIL = `${prefix}/GET_USERS_FAIL`;

export function getUsersStart() {
	return { type: GET_USERS_START }
}
export function getUsersSuccess(data) {
	return { type: GET_USERS_SUCCESS, data }
}
export function getUsersFail(error) {
	return { type: GET_USERS_FAIL, error }
}

/* ---------------------------------------------------------------------------------------------- NON-MIDDLEWARE AREA */



/* THUNK AREA ------------------------------------------------------------------------------------------------------- */

const GET_USERS_THUNK = `${prefix}/GET_USERS_THUNK`;

export function getUserThunk(dispatch) {
	return async (dispatch) => {
		try {
			dispatch(getUsersStart());
			await sleep(2000);
			const res = await axios.get('https://api.github.com/users');
			dispatch(getUsersSuccess(res.data));
		} catch (error) {
			dispatch(getUsersFail(error));
		}
	}
}

/* ------------------------------------------------------------------------------------------------------- THUNK AREA */



/* REDUCER AREA ----------------------------------------------------------------------------------------------------- */

const initialState = {
	loading: false,
	data: [],
	error: null,
}

export default function reducer(state=initialState, action) {
	if(action.type === GET_USERS_START) {
		return { ...state, loading: true, data: [], error: null };
	}

	if(action.type === GET_USERS_SUCCESS) {
		return { ...state, loading: false, data: action.data }
	}

	if(action.type === GET_USERS_FAIL) {
		return { ...state, loading: false, data: action.error }
	}

	return state;
}

/* ----------------------------------------------------------------------------------------------------- REDUCER AREA */