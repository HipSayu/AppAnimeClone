import { call, put } from 'redux-saga/effects';

function* updateMode(darkMode) {
    yield put({ type: 'CHANGE_APP_MODE_SUCCESS', payload: darkMode });
}
// put gọi dispash
export default function* (action) {
    console.log('App Saga - Action:', action);
    yield call(updateMode, action.payload.darkMode);
}

//function có *

// yield sẽ đứng lại có next ms chạy tiếp
