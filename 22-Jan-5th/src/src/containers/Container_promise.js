import List from "../components/List";
import {useDispatch, useSelector} from "react-redux";
import {useCallback} from "react";
import {getUsersPromise} from "../redux/modules/users";

export default function Container_promise() {
	const users = useSelector(state => state.users.data);
	const dispatch = useDispatch();
	const getUsers = useCallback(() => {
		dispatch(getUsersPromise());
	}, [dispatch]);

	return <List users={users} getUsers={getUsers} />
}