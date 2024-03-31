const initData = {
    videos: [],
    isLoading: false,
};

export default VideoHomeReducer = (state = initData, { type, payload }) => {
    switch (type) {
        case 'GET_VIDEOS_HOME':
            return {
                ...state,
                isLoading: true,
            };
        case 'GET_VIDEOS_HOME_SUCCESS':
            return {
                ...state,
                videos: payload,
                isLoading: false,
            };

        default:
            return state;
    }
};
