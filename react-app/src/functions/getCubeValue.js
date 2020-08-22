const getCubeValue = () => {
  // Return the colors of each of the sides of the cube.

  const cubeStatusNeededToSolve = JSON.parse(
    sessionStorage.getItem("cubeStatusNeededToSolve")
  );

  console.log(cubeStatusNeededToSolve);

  return cubeStatusNeededToSolve;
};

export default getCubeValue;
