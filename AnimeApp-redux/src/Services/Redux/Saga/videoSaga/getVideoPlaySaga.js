import { put, call } from 'redux-saga/effects';
import { getVideoById } from '~/Services/Action/PlayVideoPage';

export default function* getVideoPlaySaga(action) {
    const IdVideo = action.payload.IdVideo;

    try {
        console.log('Get_Video_Play_Saga Action:', action);

        const response = yield call(getVideoById, IdVideo);

        console.log('Get_Video_Play  :', response.data);

        yield put({ type: 'GET_VIDEO_PLAY_SUCCESS', payload: response.data });
    } catch (error) {
        console.log('Lỗi Get_Video_Play Saga', error);
        yield put({ type: 'GET_VIDEO_PLAY_FAILURE', payload: error.message });
    }
}
