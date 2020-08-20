const getCubeValue = () => {
    
    // Return the colors of each of the sides of the cube.

    const allNotations = JSON.parse(sessionStorage.getItem('allNotations'));
    return (allNotations);
}

export default getCubeValue;