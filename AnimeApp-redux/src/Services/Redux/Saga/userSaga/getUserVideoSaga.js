import { put, call } from 'redux-saga/effects';
import { GetUserVideo } from '~/Services/Api/instanceAxios';

export default function* getUserVideoSaga(action) {
    const userFollowId = action.payload.userFollowId;
    console.log('UserVideo_Saga userFollowId', userFollowId);

    try {
        console.log('UserVideo_Saga Action:', action);
        const response = yield call(GetUserVideo, userFollowId);

        yield put({ type: 'GET_USER_VIDEO_SUCCESS', payload: response.data });
    } catch (error) {
        console.log('Lỗi UserNotFollowHome Saga', error);
        yield put({ type: 'GET_USER_VIDEO_FAILURE', payload: error.message });
    }
}
