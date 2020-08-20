const initState = {
    currentPage: "welcome"
}

const rootReducer = (state = initState, action) => {
    console.log(state);
    console.log(action);
    if (action.type === 'CHANGE_PAGE') {
        return {
            ...state,
            currentPage: action.currentPage
        };
    }
    return state;
}

export default rootReducer;