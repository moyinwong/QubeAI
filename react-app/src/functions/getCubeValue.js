import { updateCubeStatus, flattedCubeStatus } from "../cube-all";

const getCubeValue = () => {
  // Return the colors of each of the sides of the cube.
  try {
      updateCubeStatus();
  console.log('hello world')
  return flattedCubeStatus;
  } catch(e) {
    console.log(e)
  }

};

export default getCubeValue;
