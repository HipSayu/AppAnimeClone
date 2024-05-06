import { put, call } from 'redux-saga/effects';
import { getVideoHomePage } from '~/Services/Api';

export default function* getVideoHomePageNotLoginSaga(action) {
    try {
        console.log('Video_hOME_Saga_nOT_lOGIN Action:', action);
        const response = yield call(getVideoHomePage);

        yield put({ type: 'GET_VIDEO_HOME_SUCCESS', payload: response.data.items });
    } catch (error) {
        console.log('Lỗi Video Saga', error);
        yield put({ type: 'GET_VIDEO_HOME_FAILURE', payload: error.message });
    }
}
