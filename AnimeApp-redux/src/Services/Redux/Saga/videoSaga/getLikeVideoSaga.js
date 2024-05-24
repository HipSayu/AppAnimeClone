import { put, call } from 'redux-saga/effects';
import { getLikeVideoById } from '~/Services/Action/PlayVideoPage';

export default function* getLikeVideoSaga(action) {
    const idVideo = action.payload.IdVideo;
    try {
        console.log('Get_Like_Video_Saga Action:', action);

        const response = yield call(getLikeVideoById, idVideo);

        console.log('Get_Like_Video', response.data);
        yield put({ type: 'GET_LIKE_VIDEO_SUCCESS', payload: response.data.likes });
    } catch (error) {
        console.log('Lỗi Get_Like_Video Saga', error);
        yield put({ type: 'GET_LIKE_VIDEO_FAILURE', payload: error.message });
    }
}
