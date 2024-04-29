import { all, takeEvery, takeLatest } from 'redux-saga/effects';

import loginSaga from './loginSaga';
import { LOGIN_REQUEST, LOGOUT_REQUEST } from '~/Services/Action/action';
import logoutSaga from './logoutSaga';
import GetVideoHomeSaga from './GetVideoHomeSaga';
import DeleteVideoHomeSaga from './DeleteVideoHomeSaga';
import GetAnimeHomeSaga from './GetAnimeHomeSaga';
import DeleteAnimeHomeSaga from './DeleteAnimeHomeSaga';

export default RootSaga = function* () {
    yield all([
        takeLatest(LOGIN_REQUEST, loginSaga),
        takeLatest('GET_VIDEO_HOME_RESQUEST', GetVideoHomeSaga),
        takeLatest('DELETE_VIDEO_HOME_RESQUEST', DeleteVideoHomeSaga),
        takeLatest('GET_ANIME_HOME_RESQUEST', GetAnimeHomeSaga),
        takeLatest('DELETE_ANIME_HOME_RESQUEST', DeleteAnimeHomeSaga),
        takeLatest(LOGOUT_REQUEST, logoutSaga),
    ]);
};
