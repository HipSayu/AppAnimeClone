import { put, call } from 'redux-saga/effects';
import { getHistorySearchByIdToken } from '~/Services/Action/SearchPage';

export default function* getHistorySearchSaga(action) {
    const userId = action.payload.userId;
    try {
        console.log('Search_History_Saga Action:', action);

        const response = yield call(getHistorySearchByIdToken, userId);

        yield put({ type: 'GET_SEARCH_HISTORY_SUCCESS', payload: response.data.items });
    } catch (error) {
        console.log('Lỗi Search_History Saga', error);

        yield put({ type: 'GET_SEARCH_HISTORY_FAILURE', payload: error.message });
    }
}
