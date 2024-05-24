import AsyncStorage from '@react-native-async-storage/async-storage';
import { put, call } from 'redux-saga/effects';
import { getAnimeHomePage } from '~/Services/Action/HomePage';

export default function* getAnimeHomeSaga(action) {
    try {
        console.log('Anime_Saga Action:', action);
        const response = yield call(getAnimeHomePage);
        AsyncStorage.setItem('my_home_animes', JSON.stringify(response.data));

        yield put({ type: 'GET_ANIME_HOME_SUCCESS', payload: response.data.items });
    } catch (error) {
        console.log('Lỗi ANIME Saga', error);
        yield put({ type: 'GET_ANIME_HOME_FAILURE', payload: error.message });
    }
}
