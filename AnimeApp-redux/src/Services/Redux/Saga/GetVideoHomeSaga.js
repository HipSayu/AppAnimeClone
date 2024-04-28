import AsyncStorage from '@react-native-async-storage/async-storage';
import { put, call } from 'redux-saga/effects';
import { getVideoHomePage } from '~/Services/Api/instanceAxios';

export default function* GetVideoHomeSaga(action) {
    try {
        console.log('Video_hOME_Saga Action:', action);
        const response = yield call(getVideoHomePage);
        console.log('Video_hOME_Saga :', response.data);

        AsyncStorage.setItem('my_home_videos', JSON.stringify(response.data));

        yield put({ type: 'GET_VIDEO_SUCCESS', payload: response.data });
    } catch (error) {
        console.log('Lỗi Video Saga');
        yield put({ type: 'GET_VIDEO_FAILURE', payload: error.message });
    }
}
