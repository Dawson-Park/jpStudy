import React, {useContext} from 'react';
import logo from './logo.svg';
import './App.css';
import { inject, observer } from "mobx-react";
import { computed } from "mobx";
import PersonStore from "./stores/PersonStore";

function App(Props:any) {
	const { personStore } = Props

	const age10 = computed(() => {
		return Math.floor(personStore.age / 10) * 10;
	}).get();

	console.log("render", personStore.age, personStore.name);

	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>{personStore.name}, {personStore.age}</p>
				<p><button onClick={click}>PLUS</button></p>
			</header>
		</div>
	);

	function click() {
		setTimeout(() => {
			personStore.testAction();
		}, 500)
		// personStore.plus();
	}
}

export default inject('personStore')(observer(App));
