import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { put, call } from 'redux-saga/effects';

import { LOGOUT_FAILURE, LOGOUT_REQUEST, LOGOUT_SUCCESS } from '~/Services/Action/action';

export default function* logoutSaga(action) {
    const userName = action.payload.userName;
    const password = action.payload.password;
    const SDT = action.payload.SDT;
    try {
        console.log('Logout Saga Action:', action);
        const response = yield call(
            axios.get,
            `http://localhost:5179/api/Login/Logout?NumberPhone=${SDT}&UserName=${userName}&Password=${password}`,
            { SDT, userName, password },
        );
        AsyncStorage.removeItem('my_token');
        AsyncStorage.removeItem('my_login'), console.log('Logout :', response.data);
        yield put({ type: LOGOUT_SUCCESS, payload: [] });
    } catch (error) {
        console.log('Lỗi Login');
        yield put({ type: LOGOUT_FAILURE, payload: error.message });
    }
}
