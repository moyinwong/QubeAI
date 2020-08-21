function getDirectionName(direction) {
  switch (direction) {
    //z clockwise
    case 0.1:
    case 1.2:
    case 2.4:
    case 3.3:
      return "z-clockwise";
    //z counter clockwise
    case 0.2:
    case 1.1:
    case 2.3:
    case 3.4:
      return "z-counterclockwise";
      break;
    //y clockwise
    case 0.4:
    case 1.3:
    case 4.3:
    case 5.4:
      return "y-clockwise";
    //y counter clockwise
    case 1.4:
    case 0.3:
    case 4.4:
    case 5.3:
      return "y-counterclockwise";
    //x clockwise
    case 2.2:
    case 3.1:
    case 4.1:
    case 5.2:
      return "x-clockwise";
    //x counter clockwise
    case 2.1:
    case 3.2:
    case 4.2:
    case 5.1:
      return "x-counterclockwise";
    default:
      return null;
  }
}

//L L + x clock
//R R + x counter
//U U + y clock
//D D + y counter
//F F + z clock
//B B + z counter

//stop cube
function stopCube() {
  intersect = null;
  startPoint = null;
}

//rotate
function rotateAroundWorldY(obj, rad) {
  const x0 = obj.position.x;
  const z0 = obj.position.z;

  const q = new THREE.Quaternion();
  q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), rad);
  obj.quaternion.premultiply(q);
  //obj.rotateY(rad);
  obj.position.x = Math.cos(rad) * x0 + Math.sin(rad) * z0;
  obj.position.z = Math.cos(rad) * z0 - Math.sin(rad) * x0;
}

function rotateAroundWorldZ(obj, rad) {
  const x0 = obj.position.x;
  const y0 = obj.position.y;
  const q = new THREE.Quaternion();
  q.setFromAxisAngle(new THREE.Vector3(0, 0, 1), rad);
  obj.quaternion.premultiply(q);
  //obj.rotateZ(rad);
  obj.position.x = Math.cos(rad) * x0 - Math.sin(rad) * y0;
  obj.position.y = Math.cos(rad) * y0 + Math.sin(rad) * x0;
}

function rotateAroundWorldX(obj, rad) {
  const y0 = obj.position.y;
  const z0 = obj.position.z;
  const q = new THREE.Quaternion();
  q.setFromAxisAngle(new THREE.Vector3(1, 0, 0), rad);
  obj.quaternion.premultiply(q);
  //obj.rotateX(rad);
  obj.position.y = Math.cos(rad) * y0 - Math.sin(rad) * z0;
  obj.position.z = Math.cos(rad) * z0 + Math.sin(rad) * y0;
}

//move cubes
function moveCube(event) {
  getIntersects(event);
  if (intersect) {
    if (!isRotating && startPoint) {
      //console.log(intersect.object);
      // console.log(
      //   cubeParams.colors[getFaceColorByVector(intersect.object, yLine)][1]
      // );
      movePoint = intersect.point;
      if (!movePoint.equals(startPoint)) {
        isRotating = true;
        const sub = movePoint.sub(startPoint);
        let direction = getDirection(sub);
        //console.log(getDirectionName(direction));
        const elements = getBoxes(intersect, direction);

        if (elements) {
          window.requestAnimFrame(function (timestamp) {
            rotateAnimation(elements, direction, timestamp, 0);
          });
        } else {
          isRotating = false;
          controller.enabled = true;
        }
      }
    }
  }
  event.preventDefault();
}

//move cube by instruction such as L R'
function moveCubeByInstruction(instruction) {
  let target;
  let direction;
  if (isRotating) {
    return;
  }

  switch (instruction) {
    case "L":
      target = scene.getObjectByName("L-Center");
      direction = 2.2;
      break;
    case "L'":
      target = scene.getObjectByName("L-Center");
      direction = 2.1;
      break;
    case "R":
      target = scene.getObjectByName("R-Center");
      direction = 2.1;
      break;
    case "R'":
      target = scene.getObjectByName("R-Center");
      direction = 2.2;
      break;
    case "U":
      target = scene.getObjectByName("U-Center");
      direction = 0.4;
      break;
    case "U'":
      target = scene.getObjectByName("U-Center");
      direction = 1.4;
      break;
    case "D":
      target = scene.getObjectByName("D-Center");
      direction = 1.4;
      break;
    case "D'":
      target = scene.getObjectByName("D-Center");
      direction = 0.4;
      break;
    case "F":
      target = scene.getObjectByName("F-Center");
      direction = 0.1;
      break;
    case "F'":
      target = scene.getObjectByName("F-Center");
      direction = 0.2;
      break;
    case "B":
      target = scene.getObjectByName("B-Center");
      direction = 0.2;
      break;
    case "B'":
      target = scene.getObjectByName("B-Center");
      direction = 0.1;
      break;
  }

  isRotating = true;
  controller.enabled = false;

  const elements = getBoxes({ object: target }, direction);

  if (elements) {
    window.requestAnimFrame(function (timestamp) {
      rotateAnimation(elements, direction, timestamp, 0);
    });
  } else {
    isRotating = false;
    controller.enabled = true;
  }
}

//rotate animation
function rotateAnimation(
  elements,
  direction,
  currentstamp,
  startstamp,
  laststamp
) {
  const totalTime = 500; //animation total time
  if (startstamp === 0) {
    startstamp = currentstamp;
    laststamp = currentstamp;
  }
  controller.enabled = false;
  if (currentstamp - startstamp >= totalTime) {
    currentstamp = startstamp + totalTime;
    isRotating = false;
    startPoint = null;
    updateCubeIndex(elements);
    //enable controller after move
    controller.enabled = true;
    isRotating = false;
    //updateCubeStatus();

    for (let children of scene.children) {
      children.verticesNeedUpdate = true;
      if (children.geometry) {
        children.geometry.normalsNeedUpdate = true;
      }
    }
    //updateCubeStatus();
  }

  //onsole.log(direction);

  switch (direction) {
    //z clockwise
    case 0.1:
    case 1.2:
    case 2.4:
    case 3.3:
      for (let i = 0; i < elements.length; i++) {
        rotateAroundWorldZ(
          elements[i],
          (((-90 * Math.PI) / 180) * (currentstamp - laststamp)) / totalTime
        );
      }
      break;
    //z counter clockwise
    case 0.2:
    case 1.1:
    case 2.3:
    case 3.4:
      for (let i = 0; i < elements.length; i++) {
        rotateAroundWorldZ(
          elements[i],
          (((90 * Math.PI) / 180) * (currentstamp - laststamp)) / totalTime
        );
      }
      break;
    //y clockwise
    case 0.4:
    case 1.3:
    case 4.3:
    case 5.4:
      for (let i = 0; i < elements.length; i++) {
        rotateAroundWorldY(
          elements[i],
          (((-90 * Math.PI) / 180) * (currentstamp - laststamp)) / totalTime
        );
      }
      break;
    //y counter clockwise
    case 1.4:
    case 0.3:
    case 4.4:
    case 5.3:
      for (let i = 0; i < elements.length; i++) {
        rotateAroundWorldY(
          elements[i],
          (((90 * Math.PI) / 180) * (currentstamp - laststamp)) / totalTime
        );
      }
      break;
    //x clockwise
    case 2.2:
    case 3.1:
    case 4.1:
    case 5.2:
      for (let i = 0; i < elements.length; i++) {
        rotateAroundWorldX(
          elements[i],
          (((90 * Math.PI) / 180) * (currentstamp - laststamp)) / totalTime
        );
      }
      break;
    //x counter clockwise
    case 2.1:
    case 3.2:
    case 4.2:
    case 5.1:
      for (let i = 0; i < elements.length; i++) {
        rotateAroundWorldX(
          elements[i],
          (((-90 * Math.PI) / 180) * (currentstamp - laststamp)) / totalTime
        );
      }
      break;
    default:
      break;
  }
  if (currentstamp - startstamp < totalTime) {
    window.requestAnimFrame(function (timestamp) {
      rotateAnimation(elements, direction, timestamp, startstamp, currentstamp);
    });
  }
}

//update cube index
function updateCubeIndex(elements) {
  for (let i = 0; i < elements.length; i++) {
    let temp1 = elements[i];
    for (let j = 0; j < initStatus.length; j++) {
      let temp2 = initStatus[j];
      if (
        Math.abs(temp1.position.x - temp2.x) <= cubeParams.len / 2 &&
        Math.abs(temp1.position.y - temp2.y) <= cubeParams.len / 2 &&
        Math.abs(temp1.position.z - temp2.z) <= cubeParams.len / 2
      ) {
        temp1.cubeIndex = temp2.cubeIndex;
        break;
      }
    }
  }
}

//get 9 boxes
function getBoxes(target, direction) {
  if (!target) return;

  let targetId = target.object.cubeIndex;
  const ids = [];
  for (let i = 0; i < cubes.length; i++) {
    ids.push(cubes[i].cubeIndex);
  }
  let minId = Math.min(...ids);
  targetId = targetId - minId;
  let numI = parseInt(targetId / 9);
  let numJ = targetId % 9;
  const boxes = [];

  switch (direction) {
    //x
    case 0.1:
    case 0.2:
    case 1.1:
    case 1.2:
    case 2.3:
    case 2.4:
    case 3.3:
    case 3.4:
      for (let i = 0; i < cubes.length; i++) {
        let tempId = cubes[i].cubeIndex - minId;
        if (numI === parseInt(tempId / 9)) {
          boxes.push(cubes[i]);
        }
      }
      break;
    //y
    case 0.3:
    case 0.4:
    case 1.3:
    case 1.4:
    case 4.3:
    case 4.4:
    case 5.3:
    case 5.4:
      for (let i = 0; i < cubes.length; i++) {
        let tempId = cubes[i].cubeIndex - minId;
        if (parseInt(numJ / 3) === parseInt((tempId % 9) / 3)) {
          boxes.push(cubes[i]);
        }
      }
      break;
    //x
    case 2.1:
    case 2.2:
    case 3.1:
    case 3.2:
    case 4.1:
    case 4.2:
    case 5.1:
    case 5.2:
      for (let i = 0; i < cubes.length; i++) {
        let tempId = cubes[i].cubeIndex - minId;
        if ((tempId % 9) % 3 === numJ % 3) {
          boxes.push(cubes[i]);
        }
      }
      break;
    default:
      break;
  }

  for (let box of boxes) {
    if (box.name == "core") {
      return null;
    }
  }

  return boxes;
}

//to get the direction
function getDirection(vector3) {
  let direction;
  const xAngle = vector3.angleTo(xLine);
  const xAngleAd = vector3.angleTo(xLineAd);
  const yAngle = vector3.angleTo(yLine);
  const yAngleAd = vector3.angleTo(yLineAd);
  const zAngle = vector3.angleTo(zLine);
  const zAngleAd = vector3.angleTo(zLineAd);
  const minAngle = Math.min(
    xAngle,
    xAngleAd,
    yAngle,
    yAngleAd,
    zAngle,
    zAngleAd
  );

  switch (minAngle) {
    case xAngle:
      direction = 0; //x
      if (normalize.equals(yLine)) {
        direction = direction + 0.1; //z clockwise
      } else if (normalize.equals(yLineAd)) {
        direction = direction + 0.2; //z counter clockwise
      } else if (normalize.equals(zLine)) {
        direction = direction + 0.3; //y counter clockwise
      } else {
        direction = direction + 0.4; //y clockwise
      }
      break;
    case xAngleAd:
      direction = 1; //x reverse
      if (normalize.equals(yLine)) {
        direction = direction + 0.1; //z counter clockwise
      } else if (normalize.equals(yLineAd)) {
        direction = direction + 0.2; //z clockwise
      } else if (normalize.equals(zLine)) {
        direction = direction + 0.3; //y clockwise
      } else {
        direction = direction + 0.4; //y counter clockwise
      }
      break;
    case yAngle:
      direction = 2; //y
      if (normalize.equals(zLine)) {
        direction = direction + 0.1; //x counter clockwise
      } else if (normalize.equals(zLineAd)) {
        direction = direction + 0.2; //x
      } else if (normalize.equals(xLine)) {
        direction = direction + 0.3; //z counter
      } else {
        direction = direction + 0.4; //z
      }
      break;
    case yAngleAd:
      direction = 3; //y reverse
      if (normalize.equals(zLine)) {
        direction = direction + 0.1; //x
      } else if (normalize.equals(zLineAd)) {
        direction = direction + 0.2; //x counter
      } else if (normalize.equals(xLine)) {
        direction = direction + 0.3; //z
      } else {
        direction = direction + 0.4; //z counter
      }
      break;
    case zAngle:
      direction = 4; //z
      if (normalize.equals(yLine)) {
        direction = direction + 0.1; //x
      } else if (normalize.equals(yLineAd)) {
        direction = direction + 0.2; //x counter
      } else if (normalize.equals(xLine)) {
        direction = direction + 0.3; //y
      } else {
        direction = direction + 0.4; //y counter
      }
      break;
    case zAngleAd:
      direction = 5; //z reverse
      if (normalize.equals(yLine)) {
        direction = direction + 0.1; //x counter
      } else if (normalize.equals(yLineAd)) {
        direction = direction + 0.2; //x
      } else if (normalize.equals(xLine)) {
        direction = direction + 0.3; //y counter
      } else {
        direction = direction + 0.4; //y
      }
      break;
    default:
      break;
  }
  return direction;
}

// function min(arr) {
//   let min = arr[0];
//   for (let i = 1; i < arr.length; i++) {
//     if (arr[i] < min) {
//       min = arr[i];
//     }
//   }
//   return min;
// }

//start control cube
function startCube(event) {
  getIntersects(event);

  if (!isRotating && intersect) {
    startPoint = intersect.point;
    controller.enabled = false;
  } else {
    controller.enabled = true;
  }
}

//use raycaster to find object
function getIntersects(event) {
  if (event.touches) {
    const touch = event.touches[0];
    mouse.x = (touch.clientX / width) * 2 - 1;
    mouse.y = -(touch.clientY / height) * 2 + 1.1;
  } else {
    mouse.x = (event.clientX / width) * 2 - 1;
    mouse.y = -(event.clientY / height) * 2 + 1.1; //standard 1, adjust for canvas
  }

  //Use raycaster to find the first pointed object
  raycaster.setFromCamera(mouse, camera);

  let intersects = raycaster.intersectObjects(scene.children);

  if (intersects.length) {
    try {
      if (intersects[0].object.cubeType === "coverCube") {
        intersect = intersects[1];
        normalize = intersects[0].face.normal;
      } else {
        intersect = intersects[0];
        normalize = intersects[1].face.normal;
      }

      //console.log(intersect);
    } catch (err) {
      console.log(err);
    }
  }
}

//use index find cube
function getCubeByCubeIndex(index) {
  for (let children of scene.children) {
    if (children.cubeIndex === index) return children;
  }
}

//update cube status array
function updateCubeStatus() {
  try {
    for (let cube of cubesStatus) {
      cubeObj = getCubeByCubeIndex(cube.cubeIndex);
      //   //console.log(cubeObj);
      //   for (let face of cubeObj.geometry.faces) {
      //     const updatedFaceNormal = computeNormal(cubeObj, face);
      //     //console.log(updatedFaceNormal);
      //     let materialIndex = face.materialIndex;
      //     let materialName = cubeObj.material[materialIndex].name;
      //     //console.log(materialName);
      //     if (Math.round(updatedFaceNormal.y) === 1) {
      //       //if (cube.cubeIndex === 0) console.log(materialName);
      //       cube.U = materialName;
      //     } else if (Math.round(updatedFaceNormal.y) === -1) {
      //       cube.D = materialName;
      //     } else if (Math.round(updatedFaceNormal.x) === 1) {
      //       cube.R = materialName;
      //     } else if (Math.round(updatedFaceNormal.x) === -1) {
      //       cube.L = materialName;
      //     } else if (Math.round(updatedFaceNormal.z) === 1) {
      //       cube.F = materialName;
      //     } else if (Math.round(updatedFaceNormal.z) === -1) {
      //       cube.B = materialName;
      //     }
      //     materialName = null;
      //   }
      cubeFaceColors = getFaceColorsOfCube(cubeObj);
      //console.log(cube);
      for (let side in cubeFaceColors) {
        cube[side] = cubeFaceColors[side];
      }
    }
    updateFlattedCubeStatus();
    console.log("updated");
    return;
  } catch (err) {
    console.log(err);
  }
}

sideFindCubeIndex = {
  LB: 21,
  LF: 3,
  LU: 9,
  LD: 15,
  DB: 25,
  DF: 7,
  UB: 19,
  UF: 1,
  RB: 23,
  RF: 5,
  RU: 11,
  RD: 17,
  LDB: 24,
  LDF: 6,
  LUB: 18,
  LUF: 0,
  RDB: 26,
  RDF: 8,
  RUB: 20,
  RUF: 2,
};

//update flatted status -------------------------------------------------------------------------
function updateFlattedCubeStatus() {
  "LB", "LF", "LU", "LD", "DB", "DF", "UB", "UF", "RB", "RF", "RU", "RD";
  for (let faces in sideFindCubeIndex) {
    //e.g. faces: LB
    for (let i = 0; i < faces.length; i++) {
      flattedCubeStatus[faces][faces[i]] = getFaceColorsOfCube(
        getCubeByCubeIndex(sideFindCubeIndex[faces])
      )[faces[i]];
    }
  }

  // flattedCubeStatus.LB.L = getFaceColorsOfCube(getCubeByCubeIndex(21)).L;
  // flattedCubeStatus.LB.B = getFaceColorsOfCube(getCubeByCubeIndex(21)).B;
  // flattedCubeStatus.LF.L = getFaceColorsOfCube(getCubeByCubeIndex(3)).L;
  // flattedCubeStatus.LF.F = getFaceColorsOfCube(getCubeByCubeIndex(3)).F;
  // flattedCubeStatus.LU.L = getFaceColorsOfCube(getCubeByCubeIndex(9)).L;
  // flattedCubeStatus.LU.U = getFaceColorsOfCube(getCubeByCubeIndex(9)).U;
  // flattedCubeStatus.LD.L = getFaceColorsOfCube(getCubeByCubeIndex(15)).L;
  // flattedCubeStatus.LD.D = getFaceColorsOfCube(getCubeByCubeIndex(15)).D;
  // flattedCubeStatus.DB.D = getFaceColorsOfCube(getCubeByCubeIndex(25)).D;
  // flattedCubeStatus.DB.B = getFaceColorsOfCube(getCubeByCubeIndex(25)).B;
  // flattedCubeStatus.DF.D = getFaceColorsOfCube(getCubeByCubeIndex(7)).D;
  // flattedCubeStatus.DF.F = getFaceColorsOfCube(getCubeByCubeIndex(7)).F;
  // flattedCubeStatus.UB.U = getFaceColorsOfCube(getCubeByCubeIndex(19)).U;
  // flattedCubeStatus.UB.B = getFaceColorsOfCube(getCubeByCubeIndex(19)).B;
  // flattedCubeStatus.UF.U = getFaceColorsOfCube(getCubeByCubeIndex(1)).U;
  // flattedCubeStatus.UF.F = getFaceColorsOfCube(getCubeByCubeIndex(1)).F;
  // flattedCubeStatus.RB.R = getFaceColorsOfCube(getCubeByCubeIndex(23)).R;
  // flattedCubeStatus.RB.B = getFaceColorsOfCube(getCubeByCubeIndex(23)).B;
  // flattedCubeStatus.RF.R = getFaceColorsOfCube(getCubeByCubeIndex(5)).R;
  // flattedCubeStatus.RF.F = getFaceColorsOfCube(getCubeByCubeIndex(5)).F;
  // flattedCubeStatus.RU.R = getFaceColorsOfCube(getCubeByCubeIndex(11)).R;
  // flattedCubeStatus.RU.U = getFaceColorsOfCube(getCubeByCubeIndex(11)).U;
  // flattedCubeStatus.RD.R = getFaceColorsOfCube(getCubeByCubeIndex(17)).R;
  // flattedCubeStatus.RD.D = getFaceColorsOfCube(getCubeByCubeIndex(17)).D;
  // "LDB", "LDF", "LUB", "LUF", "RDB", "RDF", "RUB", "RUF";
  // flattedCubeStatus.LDB.L = getFaceColorsOfCube(getCubeByCubeIndex(24)).L;
  // flattedCubeStatus.LDB.D = getFaceColorsOfCube(getCubeByCubeIndex(24)).D;
  // flattedCubeStatus.LDB.B = getFaceColorsOfCube(getCubeByCubeIndex(24)).B;
  // flattedCubeStatus.LDF.L = getFaceColorsOfCube(getCubeByCubeIndex(6)).L;
  // flattedCubeStatus.LDF.D = getFaceColorsOfCube(getCubeByCubeIndex(6)).D;
  // flattedCubeStatus.LDF.F = getFaceColorsOfCube(getCubeByCubeIndex(6)).F;
  // flattedCubeStatus.LUB.L = getFaceColorsOfCube(getCubeByCubeIndex(18)).L;
  // flattedCubeStatus.LUB.U = getFaceColorsOfCube(getCubeByCubeIndex(18)).U;
  // flattedCubeStatus.LUB.B = getFaceColorsOfCube(getCubeByCubeIndex(18)).B;
  // flattedCubeStatus.LUF.L = getFaceColorsOfCube(getCubeByCubeIndex(0)).L;
  // flattedCubeStatus.LUF.U = getFaceColorsOfCube(getCubeByCubeIndex(0)).U;
  // flattedCubeStatus.LUF.F = getFaceColorsOfCube(getCubeByCubeIndex(0)).F;
  // flattedCubeStatus.RDB.R = getFaceColorsOfCube(getCubeByCubeIndex(26)).R;
  // flattedCubeStatus.RDB.D = getFaceColorsOfCube(getCubeByCubeIndex(26)).D;
  // flattedCubeStatus.RDB.B = getFaceColorsOfCube(getCubeByCubeIndex(26)).B;
  // flattedCubeStatus.RDF.R = getFaceColorsOfCube(getCubeByCubeIndex(8)).R;
  // flattedCubeStatus.RDF.D = getFaceColorsOfCube(getCubeByCubeIndex(8)).D;
  // flattedCubeStatus.RDF.F = getFaceColorsOfCube(getCubeByCubeIndex(8)).F;
  // flattedCubeStatus.RUB.R = getFaceColorsOfCube(getCubeByCubeIndex(20)).R;
  // flattedCubeStatus.RUB.U = getFaceColorsOfCube(getCubeByCubeIndex(20)).U;
  // flattedCubeStatus.RUB.B = getFaceColorsOfCube(getCubeByCubeIndex(20)).B;
  // flattedCubeStatus.RUF.R = getFaceColorsOfCube(getCubeByCubeIndex(2)).R;
  // flattedCubeStatus.RUF.U = getFaceColorsOfCube(getCubeByCubeIndex(2)).U;
  // flattedCubeStatus.RUF.F = getFaceColorsOfCube(getCubeByCubeIndex(2)).F;
}

function getColorsByFace() {
  for (let children of scene.children) {
    if ((children.cubeIndex % 9) / 3 < 1) {
      //console.log(children);
      let upFaceIndex;
      let materialIndex;
      let materialName;
      for (let i = 0; i < children.geometry.faces.length; i++) {
        //console.log(computeNormal(children, children.geometry.faces[i]).y == 1);
        //console.log(computeNormal(children, children.geometry.faces[i]).y);
        if (computeNormal(children, children.geometry.faces[i]).y === 1) {
          upFaceIndex = i;
          materialIndex = children.geometry.faces[upFaceIndex].materialIndex;
          materialName = children.material[materialIndex].name;
          console.log(materialName);
          console.log(children.material[materialIndex].name);
          break;
        } else {
          upFaceIndex = null;
        }
      }
    }
  }
}

//get updated face normal
function computeNormal(obj, face) {
  let normal = face.normal.clone();
  let rotation = obj.rotation;
  normal.applyEuler(rotation);
  //console.log(n);
  return normal;
}

function getFaceColorsOfCube(cube) {
  const cubeFaceColors = {};
  for (let face of cube.geometry.faces) {
    const updatedFaceNormal = computeNormal(cube, face);
    //console.log(updatedFaceNormal);
    let materialIndex = face.materialIndex;
    let materialName = cube.material[materialIndex].name;
    //console.log(materialName);
    if (Math.round(updatedFaceNormal.y) === 1) {
      cubeFaceColors.U = materialName;
    } else if (Math.round(updatedFaceNormal.y) === -1) {
      cubeFaceColors.D = materialName;
    } else if (Math.round(updatedFaceNormal.x) === 1) {
      cubeFaceColors.R = materialName;
    } else if (Math.round(updatedFaceNormal.x) === -1) {
      cubeFaceColors.L = materialName;
    } else if (Math.round(updatedFaceNormal.z) === 1) {
      cubeFaceColors.F = materialName;
    } else if (Math.round(updatedFaceNormal.z) === -1) {
      cubeFaceColors.B = materialName;
    }
    materialName = null;
  }
  return cubeFaceColors;
}

function fillInColorsToCubes(dataset) {
  try {
    sides = { R: 0, L: 1, U: 2, D: 3, F: 4, B: 5 };
    materials = {
      red: redMaterial,
      orange: orangeMaterial,
      yellow: yellowMaterial,
      white: whiteMaterial,
      green: greenMaterial,
      blue: blueMaterial,
    };

    for (let faces in sideFindCubeIndex) {
      //eg faces : LB
      for (let i = 0; i < faces.length; i++) {
        cubeIndex = sideFindCubeIndex[faces];
        console.log(faces);
        console.log("cubeIndex: ", cubeIndex);
        sideIndex = sides[faces[i]];
        console.log("face :", faces[i]);
        console.log("sideIndex :", sideIndex);
        console.log("dataset faces: ", dataset[faces]);
        colorNeedToFill = dataset[faces][i];
        console.log("colorNeedToFill :", colorNeedToFill);
        colorMaterial = materials[colorNeedToFill];
        getCubeByCubeIndex(cubeIndex).material[sideIndex] = colorMaterial;
      }
    }
    console.log("filled");
  } catch (err) {
    console.log(err);
  }
}
