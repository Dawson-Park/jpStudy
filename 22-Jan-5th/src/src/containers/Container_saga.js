import List from "../components/List";
import {useDispatch, useSelector} from "react-redux";
import {useCallback} from "react";
import {getUsersSagaStart} from "../redux/modules/users";

export default function Container_saga() {
	const users = useSelector(state => state.users.data);
	const dispatch = useDispatch();
	const getUsers = useCallback(() => {
		dispatch(getUsersSagaStart());
	}, [dispatch]);

	return <List users={users} getUsers={getUsers} />
}