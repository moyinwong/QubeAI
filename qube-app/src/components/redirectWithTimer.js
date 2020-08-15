const redirectWithTimer = (props, path, time) => {
    let timer;
    const setTimer = () => {
        const timer = setTimeout(() => {
            props.history.push(path);
        }, time)
    }
    const clearTimer = () => {
        clearTimeout(timer);
    }
    clearTimer();
    setTimer();
}

export default redirectWithTimer;