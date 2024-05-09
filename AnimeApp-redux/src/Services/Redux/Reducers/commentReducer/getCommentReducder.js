const initialState = {
    comments: [],
    isLoading: false,
    error: null,
};

function getCommentReducder(state = initialState, { type, payload }) {
    switch (type) {
        case 'GET_COMMENT_RESQUEST': {
            return { ...state, isLoading: true, error: null };
        }
        case 'GET_COMMENT_SUCCESS': {
            return { ...state, isLoading: false, comments: payload };
        }
        case 'GET_COMMENT_FAILURE': {
            return { ...state, isLoading: false, error: payload };
        }
        default:
            return state;
    }
}

export default getCommentReducder;
