import List from "./List";
import {useDispatch, useSelector} from "react-redux";
import {useCallback} from "react";
import {getUserThunk} from "../redux/modules/users";

export default function Container_thunk() {
	const users = useSelector(state => state.users.data);
	const dispatch = useDispatch();
	const getUsers = useCallback(() => {
		dispatch(getUserThunk());
	}, [dispatch]);

	return <List users={users} getUsers={getUsers} />
}