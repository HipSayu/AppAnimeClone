import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { put, call } from 'redux-saga/effects';
import { getUserFollowHomePage } from '~/Services/Api/instanceAxios';

export default function* GetUserfollowHomeSaga(action) {
    const numberPhone = action.payload.SDT;
    console.log('UserFollow_Saga SDT', numberPhone);
    try {
        console.log('UserFollow_Saga Action:', action);
        const response = yield call(getUserFollowHomePage, numberPhone);
        console.log('UserFollow_Saga Data:', response.data);
        AsyncStorage.setItem('my_home_userfollows', JSON.stringify(response.data));

        console.log('UserFollowHome  :', response.data);
        yield put({ type: 'GET_USERFOLLOW_HOME_SUCCESS', payload: response.data.items });
    } catch (error) {
        console.log('Lỗi UserFollowHome Saga', error);
        yield put({ type: 'GET_USERFOLLOW_HOME_FAILURE', payload: error.message });
    }
}
