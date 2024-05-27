import { put, call } from 'redux-saga/effects';
import { getcommentVideoPage } from '~/Services/Action/PlayVideoPage';

export default function* getCommentSaga(action) {
    const idVideo = action.payload.idVideo;

    try {
        console.log('Get_Comments_Saga Action:', action);

        const response = yield call(getcommentVideoPage, idVideo);
        yield put({ type: 'GET_COMMENT_SUCCESS', payload: response.data.comments });
    } catch (error) {
        console.log('Lỗi Get_Comments Saga', error);
        yield put({ type: 'GET_COMMENT_FAILURE', payload: error.message });
    }
}
