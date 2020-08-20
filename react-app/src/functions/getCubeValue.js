const getCubeValue = () => {
    
    // Return the 9 colors of one side only of the cube.
    // This function will be called 6 times (6 sides of the cube).

    const allNotations = JSON.parse(sessionStorage.getItem('allNotations'));
    return (allNotations);
}

export default getCubeValue;