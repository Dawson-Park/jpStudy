import {action, computed, makeObservable, observable} from "mobx";

export default class PersonStore {
	@observable
	name = "Mark";

	@observable
	age = 39;

	@computed
	get age10() {
		return Math.floor(this.age / 10) * 10;
	}

	constructor() {
		makeObservable(this);
	}

	@action
	testAction() {
		this.age = 45;
		this.name = 'Hero';
	}

	@action
	plus() {
		this.age++
	}
}

export interface IPersonStore extends PersonStore{}