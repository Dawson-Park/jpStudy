import List from "./List";
import {useDispatch, useSelector} from "react-redux";
import {useCallback} from "react";
import {getUsersFail, getUsersStart, getUsersSuccess, sleep} from "../redux/modules/users";
import axios from "axios";

export default function Container_non() {
	const users = useSelector(state => state.users.data);
	const dispatch = useDispatch();
	const getUsers = useCallback(async() => {
		try {
			dispatch(getUsersStart());
			await sleep(2000);
			const res = await axios.get('https://api.github.com/users');
			dispatch(getUsersSuccess(res.data));
		} catch (error) {
			dispatch(getUsersFail(error));
		}
	}, [dispatch]);

	return <List users={users} getUsers={getUsers} />
}