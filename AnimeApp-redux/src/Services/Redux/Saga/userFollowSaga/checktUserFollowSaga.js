import { put, call } from 'redux-saga/effects';
import { CheckIsFollow } from '~/Services/Action/UserPage';

export default function* checktUserFollowSaga(action) {
    const userId = action.payload.userId;
    const userFollowId = action.payload.userFollowId;

    try {
        console.log('Check_User_Follow_Saga Action:', action);

        const response = yield call(CheckIsFollow, userId, userFollowId);

        yield put({ type: 'CHECK_USER_FOLLOW_SUCCESS', payload: response.data });
    } catch (error) {
        console.log('Lỗi Check_User_Follow Saga', error);
        yield put({ type: 'Check_USER_FOLLOW_FAILURE', payload: error.message });
    }
}
