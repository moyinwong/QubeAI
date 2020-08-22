import { updateCubeStatus, flattedCubeStatus } from "../cube-all";

const getCubeValue = () => {
  // Return the colors of each of the sides of the cube.
  updateCubeStatus();

  const cubeStatusNeededToSolve = flattedCubeStatus;

  console.log(cubeValue);
  return cubeValue;
};

export default getCubeValue;
