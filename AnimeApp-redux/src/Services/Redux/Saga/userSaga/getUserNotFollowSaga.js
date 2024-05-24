import { put, call } from 'redux-saga/effects';
import { getUserNotFollow } from '~/Services/Action/UserPage';

export default function* getUserNotFollowSaga(action) {
    const userId = action.payload.userId;
    console.log('UserNotFollow_Saga UserId', userId);

    try {
        console.log('UserNotFollow_Saga Action:', action);

        const response = yield call(getUserNotFollow, userId);

        console.log('UserNotFollow_Saga Data:', response.data);

        yield put({ type: 'GET_USER_NOT_FOLLOW_SUCCESS', payload: response.data.items });
    } catch (error) {
        console.log('Lỗi UserNotFollowHome Saga', error);
        yield put({ type: 'GET_USER_NOT_FOLLOW_FAILURE', payload: error.message });
    }
}
