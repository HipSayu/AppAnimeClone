import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import RootRecuder from './Reducers/RootRecuder';
import RootSaga from './Saga/RootSaga';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(RootRecuder, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(RootSaga);

export default {
    store,
};
