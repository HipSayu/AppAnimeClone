import AsyncStorage from '@react-native-async-storage/async-storage';
import { put, call } from 'redux-saga/effects';
import { getVideoHomePage } from '~/Services/Action/HomePage';

export default function* getVideoHomeSaga(action) {
    try {
        console.log('Video_hOME_Saga Action:', action);
        const response = yield call(getVideoHomePage);

        AsyncStorage.setItem('my_home_videos', JSON.stringify(response.data));

        yield put({ type: 'GET_VIDEO_HOME_SUCCESS', payload: response.data.items });
    } catch (error) {
        console.log('Lỗi Video Saga');
        yield put({ type: 'GET_VIDEO_HOME_FAILURE', payload: error.message });
    }
}
