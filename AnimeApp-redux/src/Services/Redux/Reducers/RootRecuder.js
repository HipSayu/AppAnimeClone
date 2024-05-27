import { combineReducers } from 'redux';

import loginReducer from './loginReducer/loginReducer';

import GetVideoHomeReducer from './homePageReducer/GetVideoHomeReducer';
import GetAnimeHomeReducer from './homePageReducer/GetAnimeHomeReducer';
import getAnimeContinuceReducer from './homePageReducer/getAnimeContinuceReducer';

import getHistorySearchReducer from './searchReducer/getHistorySearchReducer';
import getAnimeSearchReducer from './searchReducer/getAnimeSearchReducer';
import getVideoSearchReducer from './searchReducer/getVideoSearchReducer';
import getUserSearchReducer from './searchReducer/getUserSearchReducer';

import getUserfollowHomeReducer from './userReducer/getUserfollowHomeReducer';
import getUserNotFollowReducer from './userReducer/getUserNotFollowReducer';
import getUserVideoReducer from './userReducer/getUserVideoReducer';
import checkUserFollowReducer from './userFollowReducer/checkUserFollowReducer';

import getVideoPlayReducer from './videoReducer/getVideoPlayReducer';
import getVideoPlayVideoPageReducer from './videoReducer/getVideoPlayVideoPageReducer';
import getLikeVideoReducer from './videoReducer/getLikeVideoReducer';
import checkLikeVideoReducer from './videoReducer/checkLikeVideoReducer';
import getCommentReducder from './commentReducer/getCommentReducder';
import changeNameReducer from './changeUserReducer/changeNameReducer';

export default RootReducer = combineReducers({
    loginReducer,

    GetVideoHomeReducer,
    GetAnimeHomeReducer,
    getAnimeContinuceReducer,

    getUserfollowHomeReducer,
    getUserNotFollowReducer,
    getUserVideoReducer,

    getHistorySearchReducer,
    getAnimeSearchReducer,
    getVideoSearchReducer,
    getUserSearchReducer,

    checkUserFollowReducer,

    getVideoPlayReducer,
    getVideoPlayVideoPageReducer,
    getLikeVideoReducer,
    checkLikeVideoReducer,

    getCommentReducder,

    changeNameReducer,
});
