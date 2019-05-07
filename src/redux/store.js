import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';
import { loadState } from '../localStorage';
import currentTask from './modules/currentTask';
import modal from './modules/modal';
import tasks from './modules/tasks';

const reducers = combineReducers({ currentTask, tasks, modal });
const preloadedState = loadState();
const sagaMiddleware = createSagaMiddleware();

const enhancers = [];
const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;
if (typeof devToolsExtension === 'function') {
  enhancers.push(devToolsExtension());
}
const composedEnhancers = compose(
  applyMiddleware(sagaMiddleware),
  ...enhancers
);

export default createStore(reducers, preloadedState, composedEnhancers);

sagaMiddleware.run(rootSaga);
