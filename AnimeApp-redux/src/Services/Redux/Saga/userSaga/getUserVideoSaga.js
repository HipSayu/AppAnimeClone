import { put, call } from 'redux-saga/effects';
import { getUserVideo } from '~/Services/Action/UserPage';

export default function* getUserVideoSaga(action) {
    const userFollowId = action.payload.userFollowId;
    console.log('UserVideo_Saga userFollowId', userFollowId);

    try {
        console.log('UserVideo_Saga Action:', action);
        const response = yield call(getUserVideo, userFollowId);

        yield put({ type: 'GET_USER_VIDEO_SUCCESS', payload: response.data });
    } catch (error) {
        console.log('Lỗi UserNotFollowHome Saga', error);
        yield put({ type: 'GET_USER_VIDEO_FAILURE', payload: error.message });
    }
}
