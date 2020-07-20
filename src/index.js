import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {AppContainer} from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'

import { rootReducer } from './reducers/index'

// const store = createStore(rootReducer)
// import { createStore, applyMiddleware, compose } from 'redux'
// import { rootReducer } from '../reducers';
import createSagaMiddleware from 'redux-saga';
import {rootSaga} from "./sagas";
// import { rootSaga } from '../sagas/index';
const sagaMiddleware = createSagaMiddleware();
// @ts-ignore
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export function configureStore() {
    const store = createStore(rootReducer, composeEnhancer(applyMiddleware(sagaMiddleware)));
    sagaMiddleware.run(rootSaga);
    return store
}
const store = configureStore();
ReactDOM.render(
    <Provider store={store}>
      <React.StrictMode>
        <AppContainer />
      </React.StrictMode>
    </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
