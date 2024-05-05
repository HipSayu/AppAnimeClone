const initialState = {
    users: [],
    isLoading: false,
    error: null,
};

function getUserSearchReducer(state = initialState, { type, payload }) {
    switch (type) {
        case 'GET_USER_SEARCH_RESQUEST': {
            return { ...state, isLoading: true, error: null };
        }
        case 'GET_USER_SEARCH_SUCCESS': {
            return { ...state, isLoading: false, users: payload };
        }
        case 'GET_USER_SEARCH_FAILURE': {
            return { ...state, isLoading: false, error: payload };
        }
        default:
            return state;
    }
}

export default getUserSearchReducer;
