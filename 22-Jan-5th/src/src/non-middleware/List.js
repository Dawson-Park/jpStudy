import {useEffect} from "react";

export default function List({users, getUsers}) {
	useEffect(() => {
		getUsers();
	}, [getUsers]);

	if(users.length === 0) {
		return <p>User Data is Nothing</p>
	}

	return (
		<ul>
			{users.map(user => <li key={user.id}>{user.login}</li>)}
		</ul>
	)
}