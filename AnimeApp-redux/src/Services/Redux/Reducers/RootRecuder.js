import { combineReducers } from 'redux';

import loginReducer from './loginReducer';
import GetVideoHomeReducer from './GetVideoHomeReducer';
import GetAnimeHomeReducer from './GetAnimeHomeReducer';
import GetUserfollowHomeReducer from './GetUserfollowHomeReducer';
import getAnimeContinuceReducer from './getAnimeContinuceReducer';
import getHistorySearchReducer from './SearchReducer/getHistorySearchReducer';
import getAnimeSearchReducer from './SearchReducer/getAnimeSearchReducer';
import getVideoSearchReducer from './SearchReducer/getVideoSearchReducer';
import getUserSearchReducer from './SearchReducer/getUserSearchReducer';

export default RootReducer = combineReducers({
    loginReducer,

    GetVideoHomeReducer,
    GetAnimeHomeReducer,
    getAnimeContinuceReducer,

    GetUserfollowHomeReducer,

    getHistorySearchReducer,
    getAnimeSearchReducer,
    getVideoSearchReducer,
    getUserSearchReducer,
});
