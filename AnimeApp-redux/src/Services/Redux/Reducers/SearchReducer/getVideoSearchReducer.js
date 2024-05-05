const initialState = {
    videoSearchs: [],
    isLoading: false,
    error: null,
};

function getVideoSearchReducer(state = initialState, { type, payload }) {
    switch (type) {
        case 'GET_VIDEO_SEARCH_RESQUEST': {
            return { ...state, isLoading: true, error: null };
        }
        case 'GET_VIDEO_SEARCH_SUCCESS': {
            return { ...state, isLoading: false, videoSearchs: payload };
        }
        case 'GET_VIDEO_SEARCH_FAILURE': {
            return { ...state, isLoading: false, error: payload };
        }
        default:
            return state;
    }
}

export default getVideoSearchReducer;
