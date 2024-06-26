import { all, takeEvery, takeLatest } from 'redux-saga/effects';
import { LOGIN_REQUEST, LOGOUT_REQUEST } from '~/Services/Action/action';

import loginSaga from './loginSaga/loginSaga';
import logoutSaga from './loginSaga/logoutSaga';

import getVideoHomeSaga from './homePageSaga/getVideoHomeSaga';
import deleteVideoHomeSaga from './homePageSaga/deleteVideoHomeSaga';
import getAnimeHomeSaga from './homePageSaga/getAnimeHomeSaga';
import deleteAnimeHomeSaga from './homePageSaga/deleteAnimeHomeSaga';
import getUserfollowHomeSaga from './userSaga/getUserfollowHomeSaga';
import getVideoHomePageNotLoginSaga from './homePageSaga/getVideoHomePageNotLoginSaga';
import getAnimeContinuceSaga from './homePageSaga/getAnimeContinuceSaga';
import deleteAnimeContinuceSaga from './homePageSaga/deleteAnimeContinuceSaga';

import getHistorySearchSaga from './SearchSaga/getHistorySearchSaga';

import getAnimeSearchSaga from './SearchSaga/getAnimeSearchSaga';
import getVideoSearchSaga from './SearchSaga/getVideoSearchSaga';
import getUserSearchSaga from './SearchSaga/getUserSearchSaga';

import getUserNotFollowSaga from './userSaga/getUserNotFollowSaga';
import getUserVideoSaga from './userSaga/getUserVideoSaga';
import checktUserFollowSaga from './userFollowSaga/checktUserFollowSaga';

import getVideoPlaySaga from './videoSaga/getVideoPlaySaga';
import getVideoPlayVideoPageSaga from './videoSaga/getVideoPlayVideoPageSaga';
import getLikeVideoSaga from './videoSaga/getLikeVideoSaga';
import checkLikeVideoSaga from './videoSaga/checkLikeVideoSaga';
import getCommentSaga from './commentSaga/getCommentSaga';
import checkLikeNotLoginVideoSaga from './videoSaga/checkLikeNotLoginVideoSaga';
import changeNameSaga from './changeUserSaga/changeNameSaga';

export default RootSaga = function* () {
    yield all([
        takeLatest(LOGIN_REQUEST, loginSaga),
        takeLatest(LOGOUT_REQUEST, logoutSaga),

        takeEvery('GET_VIDEO_HOME_RESQUEST', getVideoHomeSaga),
        takeEvery('DELETE_VIDEO_HOME_RESQUEST', deleteVideoHomeSaga),
        takeEvery('GET_VIDEO_HOME_RESQUEST_NOT_LOGIN', getVideoHomePageNotLoginSaga),

        takeEvery('GET_ANIME_HOME_RESQUEST', getAnimeHomeSaga),
        takeEvery('DELETE_ANIME_HOME_RESQUEST', deleteAnimeHomeSaga),
        takeEvery('GET_ANIME_CONTINUCE_RESQUEST', getAnimeContinuceSaga),
        takeEvery('DELETE_ANIME_CONTINUCE_RESQUEST', deleteAnimeContinuceSaga),

        takeEvery('GET_USERFOLLOW_HOME_RESQUEST', getUserfollowHomeSaga),
        takeEvery('GET_USER_NOT_FOLLOW_RESQUEST', getUserNotFollowSaga),
        takeEvery('GET_USER_VIDEO_RESQUEST', getUserVideoSaga),

        takeEvery('GET_SEARCH_HISTORY_RESQUEST', getHistorySearchSaga),
        takeEvery('GET_ANIME_SEARCH_RESQUEST', getAnimeSearchSaga),
        takeEvery('GET_VIDEO_SEARCH_RESQUEST', getVideoSearchSaga),
        takeEvery('GET_USER_SEARCH_RESQUEST', getUserSearchSaga),

        takeEvery('CHECK_USER_FOLLOW_RESQUEST', checktUserFollowSaga),

        takeEvery('GET_VIDEO_PLAY_RESQUEST', getVideoPlaySaga),
        takeEvery('GET_VIDEO_PLAY_PLAY_VIDEO_PAGE_RESQUEST', getVideoPlayVideoPageSaga),
        takeEvery('GET_LIKE_VIDEO_RESQUEST', getLikeVideoSaga),
        takeEvery('GET_CHECK_IS_LIKE_NOT_LOGIN_VIDEO_RESQUEST', checkLikeNotLoginVideoSaga),
        takeEvery('GET_CHECK_IS_LIKE_VIDEO_RESQUEST', checkLikeVideoSaga),

        takeEvery('GET_COMMENT_RESQUEST', getCommentSaga),

        takeEvery('CHANGE_NAME_RESQUEST', changeNameSaga),
    ]);
};
