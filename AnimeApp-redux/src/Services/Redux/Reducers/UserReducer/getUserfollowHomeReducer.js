const initialState = {
    userFollows: [],
    isLoading: false,
    error: null,
};

function getUserfollowHomeReducer(state = initialState, { type, payload }) {
    switch (type) {
        case 'GET_USERFOLLOW_HOME_RESQUEST': {
            return { ...state, isLoading: true, error: null };
        }
        case 'GET_USERFOLLOW_HOME_SUCCESS': {
            return { ...state, isLoading: false, userFollows: payload };
        }
        case 'GET_USERFOLLOW_HOME_FAILURE': {
            return { ...state, isLoading: false, error: payload };
        }
        case 'DELETE_USERFOLLOW_HOME_RESQUEST': {
            return { ...state, isLoading: true, error: null };
        }
        case 'DELETE_USERFOLLOW_HOME_SUCCESS': {
            return { ...state, isLoading: false, userFollows: payload };
        }
        case 'DELETE_USERFOLLOW_HOME_FAILURE': {
            return { ...state, isLoading: false, error: payload };
        }
        default:
            return state;
    }
}

export default getUserfollowHomeReducer;
