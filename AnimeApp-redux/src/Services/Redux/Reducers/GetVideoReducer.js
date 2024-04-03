const initialState = {
    Videos: [],
    isLoading: false,
    error: null,
};

function GetVideoReducer(state = initialState, { type, payload }) {
    switch (type) {
        case 'GET_VIDEO_RESQUEST': {
            return { ...state, isLoading: true, error: null };
        }
        case 'GET_VIDEO_SUCCESS': {
            return { ...state, isLoading: false, Videos: payload };
        }
        case 'GET_VIDEO_FAILURE': {
            return { ...state, isLoading: false, error: payload };
        }
        default:
            return state;
    }
}

export default GetVideoReducer;
