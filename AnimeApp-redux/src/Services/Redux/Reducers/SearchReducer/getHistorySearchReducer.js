const initialState = {
    historySearch: [],
    isLoading: false,
    error: null,
};

function getHistorySearchReducer(state = initialState, { type, payload }) {
    switch (type) {
        case 'GET_SEARCH_HISTORY_RESQUEST': {
            return { ...state, isLoading: true, error: null };
        }
        case 'GET_SEARCH_HISTORY_SUCCESS': {
            return { ...state, isLoading: false, historySearch: payload };
        }
        case 'GET_SEARCH_HISTORY_FAILURE': {
            return { ...state, isLoading: false, error: payload };
        }
        default:
            return state;
    }
}

export default getHistorySearchReducer;
