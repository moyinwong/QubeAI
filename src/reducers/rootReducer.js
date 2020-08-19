const initState = {
    cubeValue: ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"]
}

const rootReducer = (state = initState, action) => {
    console.log(state);
    console.log(action);
    if (action.type === 'SUBMIT_CUBE') {
        return {
            ...state,
            cubeValue: action.submittedValue
        };
    }
    return state;
}

export default rootReducer;