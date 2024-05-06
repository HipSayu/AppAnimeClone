const initialState = {
    userNotFollow: [],
    isLoading: false,
    error: null,
};

function getUserNotFollowReducer(state = initialState, { type, payload }) {
    switch (type) {
        case 'GET_USER_NOT_FOLLOW_RESQUEST': {
            return { ...state, isLoading: true, error: null };
        }
        case 'GET_USER_NOT_FOLLOW_SUCCESS': {
            return { ...state, isLoading: false, userNotFollow: payload };
        }
        case 'GET_USER_NOT_FOLLOW_FAILURE': {
            return { ...state, isLoading: false, error: payload };
        }
        default:
            return state;
    }
}
export default getUserNotFollowReducer;
