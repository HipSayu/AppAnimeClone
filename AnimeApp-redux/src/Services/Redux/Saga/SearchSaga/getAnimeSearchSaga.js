import { put, call } from 'redux-saga/effects';
import { getAnimeSearch } from '~/Services/Action/SearchPage';

export default function* getAnimeSearchSaga(action) {
    const pageSize = action.payload.pageSize;
    const pageIndex = action.payload.pageIndex;
    const keyword = action.payload.keyword;

    try {
        console.log('Search_Anime_Saga Action:', action);

        const response = yield call(getAnimeSearch, pageSize, pageIndex, keyword);

        yield put({ type: 'GET_ANIME_SEARCH_SUCCESS', payload: response.data.items });
    } catch (error) {
        console.log('Lỗi Search_Anime Saga', error);

        yield put({ type: 'GET_ANIME_SEARCH_FAILURE', payload: error.message });
    }
}
