import { put, call } from 'redux-saga/effects';
import { CheckIslike } from '~/Services/Action/PlayVideoPage';

export default function* checkLikeVideoSaga(action) {
    const userId = action.payload.userId;
    const idVideo = action.payload.idVideo;
    console.log('Get_Check_Like_Video_Saga Action:', action);
    try {
        const response = yield call(CheckIslike, userId, idVideo);
        console.log(response.data);
        yield put({ type: 'GET_CHECK_IS_LIKE_VIDEO_SUCCESS', payload: response.data });
    } catch (error) {
        console.log('Lỗi Get_Check_Like_Video_Play Saga', error);
        yield put({ type: 'GET_CHECK_IS_LIKE_VIDEO_SUCCESS', payload: false });
    }
}
