import { all, takeEvery, takeLatest } from 'redux-saga/effects';

import loginSaga from './loginSaga';
import { LOGIN_REQUEST, LOGOUT_REQUEST } from '~/Services/Action/action';
import GetVideoSaga from './GetVideoSaga';
import logoutSaga from './logoutSaga';

export default RootSaga = function* () {
    yield all([
        takeLatest(LOGIN_REQUEST, loginSaga),
        takeLatest('GET_VIDEO_RESQUEST', GetVideoSaga),
        takeLatest(LOGOUT_REQUEST, logoutSaga),
    ]);
};
