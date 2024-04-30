import AsyncStorage from '@react-native-async-storage/async-storage';
import { put, call } from 'redux-saga/effects';

export default function* DeleteUserfollowHomeSaga(action) {
    try {
        console.log('Delete_UserFollow_hOME_Saga Action:', action);

        AsyncStorage.removeItem('my_home_userfollows');

        yield put({ type: 'DELETE_USERFOLLOW_HOME_SUCCESS', payload: [] });
    } catch (error) {
        console.log('Lỗi DeleTe UserFollowHome');
        yield put({ type: 'DELETE_USERFOLLOW_HOME_FAILURE', payload: error.message });
    }
}
