import axios from 'axios';
import { put, call } from 'redux-saga/effects';

export default function* GetVideoSaga(action) {
    const idVideo = action.payload.idVideo;

    try {
        console.log('Video_Saga Action:', action);
        const response = yield call(axios.get, `http://localhost:5179/api/Video/get-video-by-id/${idVideo}`);
        console.log('user :', response.data);
        yield put({ type: 'GET_VIDEO_SUCCESS', payload: response.data });
    } catch (error) {
        console.log('Lỗi Video Saga');
        yield put({ type: 'GET_VIDEO_FAILURE', payload: error.message });
    }
}
