const initData = {
    darkMode: false,
    isLoading: false,
};

export default AppReducer = (state = initData, { type, payload }) => {
    console.log('REDUCER:', type, payload);
    switch (type) {
        case 'CHANGE_APP_MODE':
            return {
                ...state,
                isLoading: true,
            };
        case 'CHANGE_APP_MODE_SUCCESS':
            return {
                ...state,
                isLoading: false,
                darkMode: payload,
            };
        default:
            return state;
    }
};
