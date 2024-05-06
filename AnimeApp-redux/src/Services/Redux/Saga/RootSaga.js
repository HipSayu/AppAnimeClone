import { all, takeEvery, takeLatest } from 'redux-saga/effects';
import loginSaga from './loginSaga';
import { LOGIN_REQUEST, LOGOUT_REQUEST } from '~/Services/Action/action';

import logoutSaga from './logoutSaga';
import GetVideoHomeSaga from './GetVideoHomeSaga';
import DeleteVideoHomeSaga from './DeleteVideoHomeSaga';
import GetAnimeHomeSaga from './GetAnimeHomeSaga';
import DeleteAnimeHomeSaga from './DeleteAnimeHomeSaga';
import getUserfollowHomeSaga from './userSaga/getUserfollowHomeSaga';
import getVideoHomePageNotLoginSaga from './getVideoHomePageNotLoginSaga';
import GetAnimeContinuceSaga from './getAnimeContinuceSaga';
import deleteAnimeContinuceSaga from './deleteAnimeContinuceSaga';
import getHistorySearchSaga from './SearchSaga/getHistorySearchSaga';
import getAnimeSearchSaga from './SearchSaga/getAnimeSearchSaga';
import getVideoSearchSaga from './SearchSaga/getVideoSearchSaga';
import getUserSearchSaga from './SearchSaga/getUserSearchSaga';
import getUserNotFollowSaga from './userSaga/getUserNotFollowSaga';
import getUserVideoSaga from './userSaga/getUserVideoSaga';
import checktUserFollowSaga from './userFollowSaga/checktUserFollowSaga';

export default RootSaga = function* () {
    yield all([
        takeLatest(LOGIN_REQUEST, loginSaga),
        takeLatest(LOGOUT_REQUEST, logoutSaga),

        takeEvery('GET_VIDEO_HOME_RESQUEST', GetVideoHomeSaga),
        takeEvery('DELETE_VIDEO_HOME_RESQUEST', DeleteVideoHomeSaga),
        takeEvery('GET_VIDEO_HOME_RESQUEST_NOT_LOGIN', getVideoHomePageNotLoginSaga),

        takeEvery('GET_ANIME_HOME_RESQUEST', GetAnimeHomeSaga),
        takeEvery('DELETE_ANIME_HOME_RESQUEST', DeleteAnimeHomeSaga),
        takeEvery('GET_ANIME_CONTINUCE_RESQUEST', GetAnimeContinuceSaga),
        takeEvery('DELETE_ANIME_CONTINUCE_RESQUEST', deleteAnimeContinuceSaga),

        takeEvery('GET_USERFOLLOW_HOME_RESQUEST', getUserfollowHomeSaga),
        takeEvery('GET_USER_NOT_FOLLOW_RESQUEST', getUserNotFollowSaga),
        takeEvery('GET_USER_VIDEO_RESQUEST', getUserVideoSaga),

        takeEvery('GET_SEARCH_HISTORY_RESQUEST', getHistorySearchSaga),
        takeEvery('GET_ANIME_SEARCH_RESQUEST', getAnimeSearchSaga),
        takeEvery('GET_VIDEO_SEARCH_RESQUEST', getVideoSearchSaga),
        takeEvery('GET_USER_SEARCH_RESQUEST', getUserSearchSaga),

        takeEvery('CHECK_USER_FOLLOW_RESQUEST', checktUserFollowSaga),
    ]);
};
