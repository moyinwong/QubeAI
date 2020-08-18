const initState = {
    cubeValue: ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
    isNavBarRendered: [false],
    currentPage: ["none"]
}

const rootReducer = (state = initState, action) => {
    console.log(action);
    if (action.type === 'SUBMIT_CUBE') {
        const newCubeValue = JSON.parse(JSON.stringify(state));
        newCubeValue.cubeValue = action.submittedValue;
        return newCubeValue;
    }
    return state;
}

export default rootReducer;