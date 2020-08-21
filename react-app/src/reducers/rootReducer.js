const initState = {
    currentState: "Nothing sunmitted"
}

const rootReducer = (state = initState, action) => {
    console.log(state);
    console.log(action);
    if (action.type === 'CHANGE_STATE') {
        return {
            ...state,
            currentState: action.currentState
        };
    }
    return state;
}

export default rootReducer;