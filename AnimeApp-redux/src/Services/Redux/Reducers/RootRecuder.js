import { combineReducers } from 'redux';
import AppReducer from './AppReducer';
import GetVideoHomeReducer from './GetVideoHomeReducer';
import loginReducer from './loginReducer';
import GetVideoReducer from './GetVideoReducer';

export default RootReducer = combineReducers({
    AppReducer,
    GetVideoHomeReducer,
    loginReducer,
    GetVideoReducer,
});
