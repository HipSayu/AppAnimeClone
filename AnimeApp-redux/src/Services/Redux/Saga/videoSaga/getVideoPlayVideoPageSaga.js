import { put, call } from 'redux-saga/effects';
import { getVideoPlayVideoPage } from '~/Services/Action/PlayVideoPage';

export default function* getVideoPlayVideoPageSaga(action) {
    const idVideo = action.payload.idVideo;
    const pageSize = action.payload.pageSize;
    const pageIndex = action.payload.pageIndex;

    try {
        console.log('Get_Video_Play_Page_Saga Action:', action);

        const response = yield call(getVideoPlayVideoPage, idVideo, pageSize, pageIndex);

        yield put({ type: 'GET_VIDEO_PLAY_PLAY_VIDEO_PAGE_SUCCESS', payload: response.data.items });
    } catch (error) {
        console.log('Lỗi Get_Video_Play_Page Saga', error);
        yield put({ type: 'GET_VIDEO_PLAY_PLAY_VIDEO_PAGE_FAILURE', payload: error.message });
    }
}
