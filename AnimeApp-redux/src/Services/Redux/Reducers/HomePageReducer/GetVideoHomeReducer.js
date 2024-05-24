const initialState = {
    Videos: [],
    isLoading: false,
    error: null,
};

function GetVideoHomeReducer(state = initialState, { type, payload }) {
    switch (type) {
        case 'GET_VIDEO_HOME_RESQUEST': {
            return { ...state, isLoading: true, error: null };
        }
        case 'GET_VIDEO_HOME_RESQUEST_NOT_LOGIN': {
            return { ...state, isLoading: true, error: null };
        }
        case 'GET_VIDEO_HOME_SUCCESS': {
            return { ...state, isLoading: false, Videos: payload };
        }
        case 'GET_VIDEO_HOME_FAILURE': {
            return { ...state, isLoading: false, error: payload };
        }
        case 'DELETE_VIDEO_HOME_RESQUEST': {
            return { ...state, isLoading: true, error: null };
        }
        case 'DELETE_VIDEO_HOME_SUCCESS': {
            return { ...state, isLoading: false, Videos: payload };
        }
        case 'DELETE_VIDEO_HOME_FAILURE': {
            return { ...state, isLoading: false, error: payload };
        }
        default:
            return state;
    }
}

export default GetVideoHomeReducer;
