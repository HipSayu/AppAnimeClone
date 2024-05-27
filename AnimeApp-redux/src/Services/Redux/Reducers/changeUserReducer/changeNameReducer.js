const initialState = {
    isChange: false,
    isLoading: false,
    error: null,
};

function changeNameReducer(state = initialState, { type, payload }) {
    switch (type) {
        case 'CHANGE_NAME_RESQUEST': {
            return { ...state, isLoading: true, error: null };
        }
        case 'CHANGE_NAME_SUCCESS': {
            return { ...state, isLoading: false, isChange: payload };
        }
        case 'CHANGE_NAME_FAILURE': {
            return { ...state, isLoading: false, error: payload };
        }
        default:
            return state;
    }
}

export default changeNameReducer;
