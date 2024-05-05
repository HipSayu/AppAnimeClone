const initialState = {
    animes: [],
    isLoading: false,
    error: null,
};

function getAnimeContinuceReducer(state = initialState, { type, payload }) {
    switch (type) {
        case 'GET_ANIME_CONTINUCE_RESQUEST': {
            return { ...state, isLoading: true, error: null };
        }
        case 'GET_ANIME_CONTINUCE_SUCCESS': {
            return { ...state, isLoading: false, animes: payload };
        }
        case 'GET_ANIME_CONTINUCE_FAILURE': {
            return { ...state, isLoading: false, error: payload };
        }
        case 'DELETE_ANIME_CONTINUCE_RESQUEST': {
            return { ...state, isLoading: true, error: null };
        }
        case 'DELETE_ANIME_CONTINUCE_SUCCESS': {
            return { ...state, isLoading: false, animes: payload };
        }
        case 'DELETE_ANIME_CONTINUCE_FAILURE': {
            return { ...state, isLoading: false, error: payload };
        }
        default:
            return state;
    }
}

export default getAnimeContinuceReducer;
