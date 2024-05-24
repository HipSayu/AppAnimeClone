import { put, call } from 'redux-saga/effects';
import { getUserFollowWithVideo } from '~/Services/Action/UserPage';

export default function* getUserfollowHomeSaga(action) {
    const pageSize = action.payload.pageSize;
    const pageIndex = action.payload.pageIndex;
    const userId = action.payload.userId;

    try {
        console.log('UserFollow_Saga Action:', action);

        const response = yield call(getUserFollowWithVideo, pageSize, pageIndex, userId);

        console.log('UserFollowHome  :', response.data);
        yield put({ type: 'GET_USERFOLLOW_HOME_SUCCESS', payload: response.data.items });
    } catch (error) {
        console.log('Lỗi UserFollowHome Saga', error);
        yield put({ type: 'GET_USERFOLLOW_HOME_FAILURE', payload: error.message });
    }
}
