import { combineReducers } from 'redux';

import loginReducer from './LoginReducer/loginReducer';

import GetVideoHomeReducer from './HomePageReducer/GetVideoHomeReducer';
import GetAnimeHomeReducer from './HomePageReducer/GetAnimeHomeReducer';
import getAnimeContinuceReducer from './HomePageReducer/getAnimeContinuceReducer';

import getHistorySearchReducer from './SearchReducer/getHistorySearchReducer';
import getAnimeSearchReducer from './SearchReducer/getAnimeSearchReducer';
import getVideoSearchReducer from './SearchReducer/getVideoSearchReducer';
import getUserSearchReducer from './SearchReducer/getUserSearchReducer';

import getUserfollowHomeReducer from './UserReducer/getUserfollowHomeReducer';
import getUserNotFollowReducer from './UserReducer/getUserNotFollowReducer';
import getUserVideoReducer from './UserReducer/getUserVideoReducer';
import checkUserFollowReducer from './userFollowReducer/checkUserFollowReducer';

import getVideoPlayReducer from './videoReducer/getVideoPlayReducer';
import getVideoPlayVideoPageReducer from './videoReducer/getVideoPlayVideoPageReducer';
import getLikeVideoReducer from './videoReducer/getLikeVideoReducer';
import checkLikeVideoReducer from './videoReducer/checkLikeVideoReducer';
import getCommentReducder from './commentReducer/getCommentReducder';

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
});
