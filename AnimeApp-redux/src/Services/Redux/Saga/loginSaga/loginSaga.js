import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { put, call } from 'redux-saga/effects';

import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from '~/Services/Action/action';

export default function* loginSaga(action) {
    const userName = action.payload.userName;
    const password = action.payload.password;
    const SDT = action.payload.SDT;
    try {
        console.log('Login Saga Action:', action);

        const response = yield call(axios.post, `http://localhost:5179/api/Login/Login_Save_Token`, {
            numberPhone: SDT,
            userName: userName,
            password: password,
        });
        AsyncStorage.setItem('my_login', JSON.stringify(response.data));
        console.log('user :', response.data);

        yield put({ type: LOGIN_SUCCESS, payload: response.data });
    } catch (error) {
        console.log('Lỗi Login', error);
        yield put({ type: LOGIN_FAILURE, payload: error.message });
    }
}
