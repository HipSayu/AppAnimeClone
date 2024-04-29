import { combineReducers } from 'redux';

import loginReducer from './loginReducer';
import GetVideoHomeReducer from './GetVideoHomeReducer';
import GetAnimeHomeReducer from './GetAnimeHomeReducer';

export default RootReducer = combineReducers({
    loginReducer,
    GetVideoHomeReducer,
    GetAnimeHomeReducer,
});
