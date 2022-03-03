import React from "react";
import {inject, observer} from "mobx-react";
import logo from './logo.svg';
import './App.css';

function AppContainer(Props:any) {
	const { personStore } = Props

	const plus = () => {
		personStore.plus();
	}

	console.log("AppContainer render");
	return <App plus={plus} age10={personStore.age10} />
}

function App({ plus, age10 }: { plus:any, age10:any }) {
	console.log("App render");

	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>{age10}</p>
				<p><button onClick={click}>PLUS</button></p>
			</header>
		</div>
	);

	function click() {
		plus();
	}
}

export default inject('personStore')(observer(AppContainer));