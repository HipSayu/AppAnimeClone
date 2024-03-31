import axios from 'axios';
import { put, call } from 'redux-saga/effects';

import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from '~/Services/Action/action';

export default function* loginSaga(action) {
    const userName = action.payload.userName;
    const password = action.payload.password;
    const SDT = action.payload.SDT;
    try {
        console.log('Video_Home Saga Action:', action);
        const response = yield call(
            axios.get,
            `http://localhost:5179/api/Login/Login?NumberPhone=${SDT}&UserName=${userName}&Password=${password}`,
            { SDT, userName, password },
        );
        console.log('user :', response.data);
        yield put({ type: LOGIN_SUCCESS, payload: response.data });
    } catch (error) {
        console.log('Looixii');
        yield put({ type: LOGIN_FAILURE, payload: error.message });
    }
}
