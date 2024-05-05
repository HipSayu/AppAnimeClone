import { put, call } from 'redux-saga/effects';
import { getVideoSearch } from '~/Services/Api/instanceAxios';

export default function* getVideoSearchSaga(action) {
    const pageSize = action.payload.pageSize;
    const pageIndex = action.payload.pageIndex;
    const keyword = action.payload.keyword;

    try {
        console.log('Search_Video_Saga Action:', action);

        const response = yield call(getVideoSearch, pageSize, pageIndex, keyword);

        yield put({ type: 'GET_VIDEO_SEARCH_SUCCESS', payload: response.data.items });
    } catch (error) {
        console.log('Lỗi Search_VIDEO Saga', error);

        yield put({ type: 'GET_VIDEO_SEARCH_FAILURE', payload: error.message });
    }
}
