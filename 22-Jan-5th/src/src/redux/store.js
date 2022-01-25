import {applyMiddleware, createStore} from "redux";
import reducer from "./modules/reducer";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./modules/rootSaga";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer, applyMiddleware(thunk, promise, sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;