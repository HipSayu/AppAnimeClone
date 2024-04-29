import AsyncStorage from '@react-native-async-storage/async-storage';
import { put, call } from 'redux-saga/effects';

export default function* DeleteAnimeHomeSaga(action) {
    try {
        console.log('Delete_Anime_hOME_Saga Action:', action);

        AsyncStorage.removeItem('my_home_animes');

        yield put({ type: 'DELETE_ANIME_HOME_SUCCESS', payload: [] });
    } catch (error) {
        console.log('Lỗi DeleTe Anime Saga');
        yield put({ type: 'DELETE_ANIME_HOME_FAILURE', payload: error.message });
    }
}
