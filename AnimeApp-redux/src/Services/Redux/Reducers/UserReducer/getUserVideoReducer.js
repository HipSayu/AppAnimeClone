const initialState = {
    userVideo: { videoUserFollow: [] },
    isLoading: false,
    error: null,
};

function getUserVideoReducer(state = initialState, { type, payload }) {
    switch (type) {
        case 'GET_USER_VIDEO_RESQUEST': {
            return { ...state, isLoading: true, error: null };
        }
        case 'GET_USER_VIDEO_SUCCESS': {
            return { ...state, isLoading: false, userVideo: payload };
        }
        case 'GET_USER_VIDEO_FAILURE': {
            return { ...state, isLoading: false, error: payload };
        }
        default:
            return state;
    }
}
export default getUserVideoReducer;
