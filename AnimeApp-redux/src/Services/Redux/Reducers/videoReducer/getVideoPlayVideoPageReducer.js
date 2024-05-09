const initialState = {
    videos: [],
    isLoading: false,
    error: null,
};

function getVideoPlayVideoPageReducer(state = initialState, { type, payload }) {
    switch (type) {
        case 'GET_VIDEO_PLAY_PLAY_VIDEO_PAGE_RESQUEST': {
            return { ...state, isLoading: true, error: null };
        }
        case 'GET_VIDEO_PLAY_PLAY_VIDEO_PAGE_SUCCESS': {
            return { ...state, isLoading: false, videos: payload };
        }
        case 'GET_VIDEO_PLAY_PLAY_VIDEO_PAGE_FAILURE': {
            return { ...state, isLoading: false, error: payload };
        }
        default:
            return state;
    }
}

export default getVideoPlayVideoPageReducer;
