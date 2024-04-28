import { all, takeEvery, takeLatest } from 'redux-saga/effects';

import loginSaga from './loginSaga';
import { LOGIN_REQUEST, LOGOUT_REQUEST } from '~/Services/Action/action';
import logoutSaga from './logoutSaga';
import GetVideoHomeSaga from './GetVideoHomeSaga';

export default RootSaga = function* () {
    yield all([
        takeLatest(LOGIN_REQUEST, loginSaga),
        takeLatest('GET_VIDEO_RESQUEST', GetVideoHomeSaga),
        takeLatest(LOGOUT_REQUEST, logoutSaga),
    ]);
};
