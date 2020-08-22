const getCubeValue = (source) => {
    let cubeValue;

    switch (source) {
        case "scan":
            cubeValue = JSON.parse(sessionStorage.getItem('allNotations'));
            break;
        case "virtual":
            cubeValue = JSON.parse(sessionStorage.getItem('allNotations'));
            break;
        default:
            cubeValue = JSON.parse(sessionStorage.getItem('allNotations'));
            break;
    }

    return (cubeValue);
}

export default getCubeValue;