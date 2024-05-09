const initialState = {
    isLike: false,
    isLoading: false,
    error: null,
};

function checkLikeVideoReducer(state = initialState, { type, payload }) {
    switch (type) {
        case 'GET_CHECK_IS_LIKE_VIDEO_RESQUEST': {
            return { ...state, isLoading: true, error: null };
        }
        case 'GET_CHECK_IS_LIKE_VIDEO_SUCCESS': {
            return { ...state, isLoading: false, isLike: payload };
        }
        case 'GET_CHECK_IS_LIKE_VIDEO_FAILURE': {
            return { ...state, isLoading: false, error: payload };
        }
        default:
            return state;
    }
}

export default checkLikeVideoReducer;
