import axios from "axios";
import { put, delay, call, takeEvery, takeLatest } from 'redux-saga/effects';

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

// const GET_USERS_THUNK = `${prefix}/GET_USERS_THUNK`;

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



/* PROMISE-MIDDLEWARE AREA ------------------------------------------------------------------------------------------ */

const GET_USERS = `${prefix}/GET_USERS`;

export const GET_USERS_PENDING = `${prefix}/GET_USERS_PENDING`;
export const GET_USERS_FULFILLED = `${prefix}/GET_USERS_FULFILLED`;
export const GET_USERS_REJECTED = `${prefix}/GET_USERS_REJECTED`;

export function getUsersPromise() {
	return {
		type: GET_USERS,
		payload: async () => {
			await sleep(2000);
			const res = await axios.get('https://api.github.com/users');
			return res.data;
		}
	}
}

/* ------------------------------------------------------------------------------------------ PROMISE-MIDDLEWARE AREA */



/* SAGA-AREA -------------------------------------------------------------------------------------------------------- */

const GET_USERS_SAGA_START = `${prefix}/GET_USERS_SAGA_START`;

function* getUsersSaga(action) {
	try {
		yield put(getUsersStart()); // 액션을 dispatch
		yield delay(2000); // 2초 대기
		// 1번째 인자로 함수의 이름, 2번째 인자로 함수의 매개변수를 입력
		const res = yield call(axios.get, 'https://api.github.com/users');
		yield put(getUsersSuccess(res.data));
	} catch (error) {
		yield put(getUsersFail(error));
	}
}

export function getUsersSagaStart() {
	return {
		type: GET_USERS_SAGA_START,
	};
}

export function* usersSaga() {
	yield takeEvery(GET_USERS_SAGA_START, getUsersSaga)
	// yield takeLatest(GET_USERS_SAGA_START, getUsersSaga)
}

/* -------------------------------------------------------------------------------------------------------- SAGA-AREA */



/* REDUCER AREA ----------------------------------------------------------------------------------------------------- */

const initialState = {
	loading: false,
	data: [],
	error: null,
}

export default function reducer(state=initialState, action) {
	if(action.type === GET_USERS_START || action.type === GET_USERS_PENDING) {
		console.log("start");
		return { ...state, loading: true, data: [], error: null };
	}

	if(action.type === GET_USERS_SUCCESS) {
		console.log("success");
		return { ...state, loading: false, data: action.data }
	}

	if(action.type === GET_USERS_FAIL) {
		console.log("fail");
		return { ...state, loading: false, error: action.error }
	}

	// PROMISE-MIDDLEWARE
	if(action.type === GET_USERS_FULFILLED) {
		return { ...state, loading: false, data: action.payload }
	}

	// PROMISE-MIDDLEWARE
	if(action.type === GET_USERS_REJECTED) {
		return { ...state, loading: false, error: action.payload }
	}

	return state;
}

/* ----------------------------------------------------------------------------------------------------- REDUCER AREA */