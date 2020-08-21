export const changeState = (currentState) => {
    return {
        type: 'CHANGE_STATE',
        currentState: currentState
    }
}