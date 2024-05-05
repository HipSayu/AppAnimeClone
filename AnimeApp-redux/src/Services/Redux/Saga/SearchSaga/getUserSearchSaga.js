import { put, call } from 'redux-saga/effects';
import { getUserSearch } from '~/Services/Api/instanceAxios';

export default function* getUserSearchSaga(action) {
    const pageSize = action.payload.pageSize;
    const pageIndex = action.payload.pageIndex;
    const keyword = action.payload.keyword;

    try {
        console.log('Search_User_Saga Action:', action);

        const response = yield call(getUserSearch, pageSize, pageIndex, keyword);

        yield put({ type: 'GET_USER_SEARCH_SUCCESS', payload: response.data.items });
    } catch (error) {
        console.log('Lỗi Search_USER Saga', error);

        yield put({ type: 'GET_USER_SEARCH_FAILURE', payload: error.message });
    }
}
