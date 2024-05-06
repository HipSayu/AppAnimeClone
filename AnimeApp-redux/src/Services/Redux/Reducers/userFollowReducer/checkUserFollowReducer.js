const initialState = {
    success: null,
    isLoading: false,
    error: null,
};

function checkUserFollowReducer(state = initialState, { type, payload }) {
    switch (type) {
        case 'CHECK_USER_FOLLOW_RESQUEST': {
            return { ...state, isLoading: true, error: null };
        }
        case 'CHECK_USER_FOLLOW_SUCCESS': {
            return { ...state, isLoading: false, success: payload };
        }
        case 'CHECK_USER_FOLLOW_FAILURE': {
            return { ...state, isLoading: false, error: payload };
        }
        default:
            return state;
    }
}

export default checkUserFollowReducer;
