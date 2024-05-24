import AsyncStorage from '@react-native-async-storage/async-storage';
import { put, call } from 'redux-saga/effects';

export default function* deleteVideoHomeSaga(action) {
    try {
        console.log('Delete_Video_hOME_Saga Action:', action);

        AsyncStorage.removeItem('my_home_videos');

        yield put({ type: 'DELETE_VIDEO_HOME_SUCCESS', payload: [] });
    } catch (error) {
        console.log('Lỗi Deleye Video Saga');
        yield put({ type: 'DELETE_VIDEO_HOME_FAILURE', payload: error.message });
    }
}
