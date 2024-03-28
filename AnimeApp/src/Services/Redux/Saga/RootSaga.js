import { all, takeEvery } from 'redux-saga/effects';
import AppSaga from './AppSaga';

export default RootSaga = function* () {
    yield all([takeEvery('CHANGE_APP_MODE', AppSaga)]);
};
