import { call, put } from 'redux-saga/effects';
import getVideoHome from '~/Services/Action/Home/getVideoHome';

export default function* (action) {
    // console.log('Video_Home Saga Action:', action);
    const videos = yield call(getVideoHome); // call Api
    // console.log('videos', videos);
    yield put({ type: 'GET_VIDEOS_HOME_SUCCESS', payload: videos });
}
