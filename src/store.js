import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import rootSaga from './sagas';

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

export default createStore(reducers, composedEnhancers);

sagaMiddleware.run(rootSaga);
