const initialState = {
    animes: [],
    isLoading: false,
    error: null,
};

function getAnimeSearchReducer(state = initialState, { type, payload }) {
    switch (type) {
        case 'GET_ANIME_SEARCH_RESQUEST': {
            return { ...state, isLoading: true, error: null };
        }
        case 'GET_ANIME_SEARCH_SUCCESS': {
            return { ...state, isLoading: false, animes: payload };
        }
        case 'GET_ANIME_SEARCH_FAILURE': {
            return { ...state, isLoading: false, error: payload };
        }
        default:
            return state;
    }
}

export default getAnimeSearchReducer;
