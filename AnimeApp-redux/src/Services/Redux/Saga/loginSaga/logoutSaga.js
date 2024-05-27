import { put, call } from 'redux-saga/effects';
import { clearLogin } from '~/Services/Action/Login';

import { LOGIN_SUCCESS, LOGOUT_FAILURE, LOGOUT_REQUEST, LOGOUT_SUCCESS } from '~/Services/Action/action';

export default function* logoutSaga(action) {
    // const userName = action.payload.userName;
    // const password = action.payload.password;
    // const SDT = action.payload.SDT;
    try {
        console.log('Logout Saga Action:', action);

        const response = yield call(clearLogin);

        yield put({ type: LOGOUT_SUCCESS, payload: [] });
    } catch (error) {
        console.log('Lỗi Login');
        yield put({ type: LOGOUT_FAILURE, payload: error.message });
    }
}
