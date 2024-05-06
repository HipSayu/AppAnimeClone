import { combineReducers } from 'redux';

import loginReducer from './loginReducer';
import GetVideoHomeReducer from './GetVideoHomeReducer';
import GetAnimeHomeReducer from './GetAnimeHomeReducer';
import getAnimeContinuceReducer from './getAnimeContinuceReducer';

import getHistorySearchReducer from './SearchReducer/getHistorySearchReducer';
import getAnimeSearchReducer from './SearchReducer/getAnimeSearchReducer';
import getVideoSearchReducer from './SearchReducer/getVideoSearchReducer';
import getUserSearchReducer from './SearchReducer/getUserSearchReducer';

import getUserfollowHomeReducer from './UserReducer/getUserfollowHomeReducer';
import getUserNotFollowReducer from './UserReducer/getUserNotFollowReducer';
import getUserVideoReducer from './UserReducer/getUserVideoReducer';
import checkUserFollowReducer from './userFollowReducer/checkUserFollowReducer';

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
});
