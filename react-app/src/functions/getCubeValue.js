import { updateCubeStatus, flattedCubeStatus } from "../cube-all";

const getCubeValue = () => {
  // Return the colors of each of the sides of the cube.
  updateCubeStatus();

  return flattedCubeStatus;
};

export default getCubeValue;
