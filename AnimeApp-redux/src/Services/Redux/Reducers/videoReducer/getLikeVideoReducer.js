const initialState = {
    likes: null,
    isLoading: false,
    error: null,
};

function getLikeVideoReducer(state = initialState, { type, payload }) {
    switch (type) {
        case 'GET_LIKE_VIDEO_RESQUEST': {
            return { ...state, isLoading: true, error: null };
        }
        case 'GET_LIKE_VIDEO_SUCCESS': {
            return { ...state, isLoading: false, likes: payload };
        }
        case 'GET_LIKE_VIDEO_FAILURE': {
            return { ...state, isLoading: false, error: payload };
        }
        default:
            return state;
    }
}

export default getLikeVideoReducer;
