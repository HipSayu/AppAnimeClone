import AsyncStorage from '@react-native-async-storage/async-storage';
import { put, call } from 'redux-saga/effects';

export default function* deleteAnimeContinuceSaga(action) {
    try {
        console.log('Delete_Anime_hOME_Saga Action:', action);

        AsyncStorage.removeItem('MY_CONTINUCE_ANIME');

        yield put({ type: 'DELETE_ANIME_CONTINUCE_SUCCESS', payload: [] });
    } catch (error) {
        console.log('Lỗi DeleTe Anime Saga');
        yield put({ type: 'DELETE_ANIME_CONTINUCE_FAILURE', payload: error.message });
    }
}
