import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE,
} from '~/Services/Action/action';

const initialState = {
    userInfo: [],
    isLoading: false,
    error: null,
    isLogin: false,
};

function loginReducer(state = initialState, { type, payload }) {
    switch (type) {
        case LOGIN_REQUEST: {
            return { ...state, isLoading: true, error: null };
        }
        case LOGIN_SUCCESS: {
            return { ...state, isLoading: false, userInfo: payload, isLogin: true };
        }
        case LOGIN_FAILURE: {
            return { ...state, isLoading: false, error: payload };
        }
        case LOGOUT_REQUEST: {
            return { ...state, isLoading: true, error: null };
        }
        case LOGOUT_SUCCESS: {
            return { ...state, isLoading: false, userInfo: payload, isLogin: false };
        }
        case LOGOUT_FAILURE: {
            return { ...state, isLoading: false, error: payload };
        }
        default:
            return state;
    }
}

export default loginReducer;
