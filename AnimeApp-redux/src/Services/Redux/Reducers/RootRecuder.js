import { combineReducers } from 'redux';

import loginReducer from './loginReducer';
import GetVideoHomeReducer from './GetVideoHomeReducer';
import GetAnimeHomeReducer from './GetAnimeHomeReducer';
import GetUserfollowHomeReducer from './GetUserfollowHomeReducer';

export default RootReducer = combineReducers({
    loginReducer,
    GetVideoHomeReducer,
    GetAnimeHomeReducer,
    GetUserfollowHomeReducer,
});
