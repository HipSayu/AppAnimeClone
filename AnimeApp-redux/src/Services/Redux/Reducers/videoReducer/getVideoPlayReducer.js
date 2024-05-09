const initialState = {
    videoinformation: {},
    isLoading: false,
    error: null,
};

function getVideoPlayReducer(state = initialState, { type, payload }) {
    switch (type) {
        case 'GET_VIDEO_PLAY_RESQUEST': {
            return { ...state, isLoading: true, error: null };
        }
        case 'GET_VIDEO_PLAY_SUCCESS': {
            return { ...state, isLoading: false, videoinformation: payload };
        }
        case 'GET_VIDEO_PLAY_FAILURE': {
            return { ...state, isLoading: false, error: payload };
        }
        default:
            return state;
    }
}

export default getVideoPlayReducer;
