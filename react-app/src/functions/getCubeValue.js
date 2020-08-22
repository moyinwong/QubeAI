const getCubeValue = (source) => {
  let cubeValue;

  switch (source) {
    case "scan":
      cubeValue = JSON.parse(sessionStorage.getItem('allNotations'));
      break;
    case "virtual":
      cubeValue = JSON.parse(sessionStorage.getItem('cubeStatusNeededToSolve'));
      break;
    default:
      cubeValue = JSON.parse(sessionStorage.getItem('allNotations'));
      break;
  }

  console.log(cubeValue);
  return (cubeValue);
};

export default getCubeValue;
