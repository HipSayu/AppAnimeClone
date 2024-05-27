import { put, call } from 'redux-saga/effects';

export default function* changeNameSaga(action) {
    // const userName = action.payload.userName;
    // const userId = action.payload.userId;

    try {
        console.log('Change_Name Action:', action);

        yield put({ type: 'CHANGE_NAME_SUCCESS', payload: true });
    } catch (error) {
        console.log('Lỗi Change', error);
        yield put({ type: 'CHANGE_NAME_FAILURE', payload: error.message });
    }
}
