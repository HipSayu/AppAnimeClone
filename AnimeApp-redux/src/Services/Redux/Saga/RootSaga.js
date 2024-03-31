import { all, takeEvery, takeLatest } from 'redux-saga/effects';
import AppSaga from './AppSaga';
import getVideoHomeSaga from './getVideoHomeSaga';
import loginSaga from './loginSaga';
import { LOGIN_REQUEST } from '~/Services/Action/action';

export default RootSaga = function* () {
    yield all([
        takeEvery('CHANGE_APP_MODE', AppSaga),
        takeEvery('GET_VIDEOS_HOME', getVideoHomeSaga),
        takeLatest(LOGIN_REQUEST, loginSaga),
    ]);
};
