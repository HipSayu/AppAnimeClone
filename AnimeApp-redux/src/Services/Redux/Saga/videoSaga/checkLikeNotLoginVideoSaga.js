import { put } from 'redux-saga/effects';

export default function* checkLikeNotLoginVideoSaga(action) {
    console.log('Get_Check_Like_Not_Login_Video_Saga Action:', action);
    try {
        yield put({ type: 'GET_CHECK_IS_LIKE_NOT_LOGIN_VIDEO_RESQUEST', payload: false });
    } catch (error) {
        console.log('Lỗi Get_Check_Like_Not_Login_Video_Play Saga', error);
        yield put({ type: 'GET_CHECK_IS_LIKE_NOT_LOGIN_VIDEO_FAILURE', payload: error.message });
    }
}
