const initialState = {
    Animes: [],
    isLoading: false,
    error: null,
};

function GetAnimeHomeReducer(state = initialState, { type, payload }) {
    switch (type) {
        case 'GET_ANIME_HOME_RESQUEST': {
            return { ...state, isLoading: true, error: null };
        }
        case 'GET_ANIME_HOME_SUCCESS': {
            return { ...state, isLoading: false, Animes: payload };
        }
        case 'GET_ANIME_HOME_FAILURE': {
            return { ...state, isLoading: false, error: payload };
        }
        case 'DELETE_ANIME_HOME_RESQUEST': {
            return { ...state, isLoading: true, error: null };
        }
        case 'DELETE_ANIME_HOME_SUCCESS': {
            return { ...state, isLoading: false, Animes: payload };
        }
        case 'DELETE_ANIME_HOME_FAILURE': {
            return { ...state, isLoading: false, error: payload };
        }
        default:
            return state;
    }
}

export default GetAnimeHomeReducer;
