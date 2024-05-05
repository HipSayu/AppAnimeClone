import AsyncStorage from '@react-native-async-storage/async-storage';
import { put, call } from 'redux-saga/effects';
import { getAnimeContinucePage } from '~/Services/Api/instanceAxios';

export default function* getAnimeContinuceSaga(action) {
    try {
        console.log('Anime_Continuce_Saga Action:', action);
        const response = yield call(getAnimeContinucePage);
        AsyncStorage.setItem('MY_CONTINUCE_ANIME', JSON.stringify(response.data));
        console.log('anime continuce  :', response.data);
        yield put({ type: 'GET_ANIME_CONTINUCE_SUCCESS', payload: response.data.items });
    } catch (error) {
        console.log('Lỗi ANIME Saga', error);
        yield put({ type: 'GET_ANIME_CONTINUCE_FAILURE', payload: error.message });
    }
}
