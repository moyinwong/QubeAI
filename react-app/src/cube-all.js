import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;
const origPoint = new THREE.Vector3(0, 0, 0);
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let controller;
//const viewCenter = new THREE.Vector3(0, 0, 0);
let isRotating = false;
let intersect;
let normalize;
let startPoint;
let movePoint;
let initStatus = [];
const xLine = new THREE.Vector3(1, 0, 0);
const xLineAd = new THREE.Vector3(-1, 0, 0);
const yLine = new THREE.Vector3(0, 1, 0);
const yLineAd = new THREE.Vector3(0, -1, 0);
const zLine = new THREE.Vector3(0, 0, 1);
const zLineAd = new THREE.Vector3(0, 0, -1);

const cubesStatus = [];
//"L", "R", "U", "D", "F", "B"
//"LB", "LF", "LU", "LD", "DB", "DF", "UB", "UF", "RB", "RF", "RU", "RD"
//"LDB", "LDF", "LUB", "LUF", "RDB", "RDF", "RUB", "RUF"
export const flattedCubeStatus = {
  L: { L: "red" },
  R: { R: "orange" },
  U: { U: "yellow" },
  D: { D: "white" },
  F: { F: "green" },
  B: { B: "blue" },
  LB: { L: null, B: null },
  LF: { L: null, F: null },
  LU: { L: null, U: null },
  LD: { L: null, D: null },
  DB: { D: null, B: null },
  DF: { D: null, F: null },
  UB: { U: null, B: null },
  UF: { U: null, F: null },
  RB: { R: null, B: null },
  RF: { R: null, F: null },
  RU: { R: null, U: null },
  RD: { R: null, D: null },
  LDB: { L: null, D: null, B: null },
  LDF: { L: null, D: null, F: null },
  LUB: { L: null, U: null, B: null },
  LUF: { L: null, U: null, F: null },
  RDB: { R: null, D: null, B: null },
  RDF: { R: null, D: null, F: null },
  RUB: { R: null, U: null, B: null },
  RUF: { R: null, U: null, F: null },
};

//detect if need to request animation frame
window.requestAnimFrame = (function () {
  return (
    window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    window.webkitRequestAnimationFrame
  );
})();

//change width / height if resize
function onWindowResize() {
  canvasWidth = window.innerWidth;
  canvasHeight = window.innerHeight;
  // width = 500;
  // height = 500;
  camera.aspect = canvasWidth / canvasHeight;
  camera.updateProjectionMatrix();
  //camera.position.set(0, 20, 100);
  renderer.setSize(canvasWidth, canvasHeight);
}

window.addEventListener("resize", onWindowResize, false);

// function initThree() {
//   const width = window.innerWidth;
//   const height = window.innerHeight;
//   renderer = new THREE.WebGLRenderer({
//     antialias: true,
//   });
//   renderer.setSize(width, height);
//   renderer.setClearColor(0xffffff, 1.0);
//   document.getElementById("canvas-frame").appendChild(renderer.domElement);
// }

const camera = new THREE.PerspectiveCamera(
  45,
  canvasWidth / canvasHeight,
  1,
  1000
);
camera.position.set(200, 200, 600);
camera.up.set(0, 1, 0);
camera.lookAt(origPoint);

const scene = new THREE.Scene();

const light = new THREE.AmbientLight(0xfefefe);
scene.add(light);

const cubeParams = {
  x: 0,
  y: 0,
  z: 0,
  len: 50,
  colors: [
    ["rgba(255,193,37,1)", "orange"], //orange
    ["rgba(178,34,34,1)", "red"], //red
    ["rgba(255,255,0,1)", "yellow"], //yellow
    ["rgba(255,255,255,1)", "white"], //white
    ["rgba(50,205,50,1)", "green"], //green
    ["rgba(0,191,255,1)", "blue"], //blue
  ],
};

//for texture
function faces(rgbaColor) {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const context = canvas.getContext("2d");
  context.fillStyle = "rgba(50,50,50,1)";
  context.fillRect(0, 0, 256, 256);
  context.rect(19, 19, 218, 218);
  context.lineJoin = "round";
  context.lineWidth = 16;
  context.fillStyle = rgbaColor;
  context.strokeStyle = rgbaColor;
  context.stroke();
  context.fill();
  return canvas;
}

const orangeTexture = new THREE.Texture(faces(cubeParams.colors[0][0]));
orangeTexture.needsUpdate = true;
const redTexture = new THREE.Texture(faces(cubeParams.colors[1][0]));
redTexture.needsUpdate = true;
const yellowTexture = new THREE.Texture(faces(cubeParams.colors[2][0]));
yellowTexture.needsUpdate = true;
const whiteTexture = new THREE.Texture(faces(cubeParams.colors[3][0]));
whiteTexture.needsUpdate = true;
const greenTexture = new THREE.Texture(faces(cubeParams.colors[4][0]));
greenTexture.needsUpdate = true;
const blueTexture = new THREE.Texture(faces(cubeParams.colors[5][0]));
blueTexture.needsUpdate = true;

const orangeMaterial = new THREE.MeshLambertMaterial({
  map: orangeTexture,
  name: cubeParams.colors[0][1],
});

const redMaterial = new THREE.MeshLambertMaterial({
  map: redTexture,
  name: cubeParams.colors[1][1],
});

const yellowMaterial = new THREE.MeshLambertMaterial({
  map: yellowTexture,
  name: cubeParams.colors[2][1],
});

const whiteMaterial = new THREE.MeshLambertMaterial({
  map: whiteTexture,
  name: cubeParams.colors[3][1],
});

const greenMaterial = new THREE.MeshLambertMaterial({
  map: greenTexture,
  name: cubeParams.colors[4][1],
});

const blueMaterial = new THREE.MeshLambertMaterial({
  map: blueTexture,
  name: cubeParams.colors[5][1],
});

/*----------------------- need to change by fill in detected color ----------------------*/

//create simple cube
function simpleCubes(x, y, z, len, colors) {
  //cube left top Axis
  const leftUpX = x - (3 / 2) * len;
  const leftUpY = y + (3 / 2) * len;
  const leftUpZ = z + (3 / 2) * len;

  const cubes = [];

  //push cubes 3 times @ 9 / times
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3 * 3; j++) {
      //color *all color is same in a faces
      const materials = [];
      for (let i = 0; i < colors.length; i++) {
        const texture = new THREE.Texture(faces(colors[i][0]));
        texture.needsUpdate = true;
        const material = new THREE.MeshLambertMaterial({ map: texture });
        material.name = colors[i][1];
        materials.push(material);
        //console.log(materials);
      }

      const geometry = new THREE.BoxGeometry(len, len, len);
      const cube = new THREE.Mesh(geometry, materials);

      cube.position.x = leftUpX + len / 2 + (j % 3) * len;
      cube.position.y = leftUpY - len / 2 - parseInt(j / 3) * len;
      cube.position.z = leftUpZ - len / 2 - i * len;
      //cube.name = "cube" + (i * 1 + j);

      //console.log(cube.position.x, cube.position.y, cube.position.z);

      if (
        cube.position.x === 0 &&
        cube.position.y === 0 &&
        cube.position.z === 50
      ) {
        cube.name = "F-Center";
      }

      if (
        cube.position.x === 0 &&
        cube.position.y === 0 &&
        cube.position.z === -50
      ) {
        cube.name = "B-Center";
      }

      if (
        cube.position.x === len &&
        cube.position.y === 0 &&
        cube.position.z === 0
      ) {
        cube.name = "R-Center";
      }

      if (
        cube.position.x === -len &&
        cube.position.y === 0 &&
        cube.position.z === 0
      ) {
        cube.name = "L-Center";
      }

      if (
        cube.position.x === 0 &&
        cube.position.y === len &&
        cube.position.z === 0
      ) {
        cube.name = "U-Center";
      }

      if (
        cube.position.x === 0 &&
        cube.position.y === -len &&
        cube.position.z === 0
      ) {
        cube.name = "D-Center";
      }

      if (
        cube.position.x === 0 &&
        cube.position.y === 0 &&
        cube.position.z === 0
      ) {
        cube.name = "core";
      }

      cubes.push(cube);
    }
  }
  return cubes;
}

//create cubes
let cubes = [];
function initObject() {
  cubes = simpleCubes(
    cubeParams.x,
    cubeParams.y,
    cubeParams.z,
    cubeParams.len,
    cubeParams.colors
  );

  for (let i = 0; i < cubes.length; i++) {
    const item = cubes[i];

    //update cubeIndex after each move
    initStatus.push({
      x: item.position.x,
      y: item.position.y,
      z: item.position.z,
      cubeIndex: i,
    });
    item.cubeIndex = i;
    //item.geometry.normalsNeedUpdate = true;
    //item.geometry.verticesNeedUpdate = true;
    cubesStatus.push({
      cubeIndex: i,
      R: cubeParams.colors[0][1],
      L: cubeParams.colors[1][1],
      U: cubeParams.colors[2][1],
      D: cubeParams.colors[3][1],
      F: cubeParams.colors[4][1],
      B: cubeParams.colors[5][1],
    });
    scene.add(cubes[i]);
  }
}

//not visible
function initInvisibleCube() {
  const cubegeo = new THREE.BoxGeometry(150, 150, 150);
  let hex = 0x000000;
  for (let i = 0; i < cubegeo.faces.length; i += 2) {
    cubegeo.faces[i].color.setHex(hex);
    cubegeo.faces[i + 1].color.setHex(hex);
  }
  const cubemat = new THREE.MeshBasicMaterial({
    vertexColors: THREE.FaceColors,
    opacity: 0,
    transparent: true,
  });
  const cube = new THREE.Mesh(cubegeo, cubemat);
  cube.cubeType = "coverCube";
  scene.add(cube);
}

//render
function render() {
  renderer.clear();
  renderer.render(scene, camera);
  window.requestAnimFrame(render);
}

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

//console.log(container.clientWidth);

renderer.setSize(canvasWidth, canvasHeight);
renderer.setClearColor(0x000000, 0); // the default
// document.getElementById("canvasVirtual").appendChild(renderer.domElement);

function getCanvas() {
  return new Promise((resolve, reject) => {
    function check() {
      const container = document.getElementById("canvasVirtual");
      if (container) {
        resolve(container);
      } else {
        setTimeout(check);
      }
    }
    check();
  });
}
//start-------------------------------------------------------------------------------------------------------------------
export async function threeStart() {
  let container = await getCanvas();
  container.appendChild(renderer.domElement);

  if (getCubeByCubeIndex(0)) {
    updateCubeStatus();
    return "Already Rendered";
  }

  initObject();
  render();

  //add EventListener
  renderer.domElement.addEventListener("mousedown", startCube, false);
  renderer.domElement.addEventListener("mousemove", moveCube, false);
  renderer.domElement.addEventListener("mouseup", stopCube, false);

  renderer.domElement.addEventListener("touchstart", startCube, false);
  renderer.domElement.addEventListener("touchmove", moveCube, false);
  renderer.domElement.addEventListener("touchend", stopCube, false);

  if (!controller) {
    controller = new OrbitControls(camera, renderer.domElement);
    controller.target = new THREE.Vector3(0, 0, 0);

    initInvisibleCube();
  }

  const allNotations = JSON.parse(sessionStorage.getItem("allNotations"));

  if (allNotations) {
    fillInColorsToCubes(allNotations);
  }
  updateCubeStatus();
}

threeStart();

const scannedDataset = JSON.parse(sessionStorage.getItem("allNotations"));

if (scannedDataset) fillInColorsToCubes(scannedDataset);

// moveCubeByList(["U'", "L'", "D", "R", "L'"]);

// function getDirectionName(direction) {
//   switch (direction) {
//     //z clockwise
//     case 0.1:
//     case 1.2:
//     case 2.4:
//     case 3.3:
//       return "z-clockwise";
//     //z counter clockwise
//     case 0.2:
//     case 1.1:
//     case 2.3:
//     case 3.4:
//       return "z-counterclockwise";
//       break;
//     //y clockwise
//     case 0.4:
//     case 1.3:
//     case 4.3:
//     case 5.4:
//       return "y-clockwise";
//     //y counter clockwise
//     case 1.4:
//     case 0.3:
//     case 4.4:
//     case 5.3:
//       return "y-counterclockwise";
//     //x clockwise
//     case 2.2:
//     case 3.1:
//     case 4.1:
//     case 5.2:
//       return "x-clockwise";
//     //x counter clockwise
//     case 2.1:
//     case 3.2:
//     case 4.2:
//     case 5.1:
//       return "x-counterclockwise";
//     default:
//       return null;
//   }
// }

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
    default:
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
    if (box.name === "core") {
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
    mouse.x = (touch.clientX / canvasWidth) * 2 - 1;
    mouse.y = -(touch.clientY / canvasHeight) * 2 + 1;
  } else {
    mouse.x = (event.clientX / canvasWidth) * 2 - 1;
    mouse.y = -(event.clientY / canvasHeight) * 2 + 1; //standard 1, adjust for canvas
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
export function updateCubeStatus() {
  try {
    for (let cube of cubesStatus) {
      const cubeObj = getCubeByCubeIndex(cube.cubeIndex);
      const cubeFaceColors = getFaceColorsOfCube(cubeObj);
      //console.log(cube);
      for (let side in cubeFaceColors) {
        cube[side] = cubeFaceColors[side];
      }
    }
    updateFlattedCubeStatus();
    console.log("updated");
    console.log(flattedCubeStatus);
    return;
  } catch (err) {
    console.log(err);
  }
}

const sideFindCubeIndex = {
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
  //"LB", "LF", "LU", "LD", "DB", "DF", "UB", "UF", "RB", "RF", "RU", "RD";
  for (let faces in sideFindCubeIndex) {
    //e.g. faces: LB
    for (let i = 0; i < faces.length; i++) {
      flattedCubeStatus[faces][faces[i]] = getFaceColorsOfCube(
        getCubeByCubeIndex(sideFindCubeIndex[faces])
      )[faces[i]];
    }
  }
  //store in session
  sessionStorage.setItem(
    "cubeStatusNeededToSolve",
    JSON.stringify(flattedCubeStatus)
  );
}

// function getColorsByFace() {
//   for (let children of scene.children) {
//     if ((children.cubeIndex % 9) / 3 < 1) {
//       //console.log(children);
//       let upFaceIndex;
//       let materialIndex;
//       let materialName;
//       for (let i = 0; i < children.geometry.faces.length; i++) {
//         //console.log(computeNormal(children, children.geometry.faces[i]).y == 1);
//         //console.log(computeNormal(children, children.geometry.faces[i]).y);
//         if (computeNormal(children, children.geometry.faces[i]).y === 1) {
//           upFaceIndex = i;
//           materialIndex = children.geometry.faces[upFaceIndex].materialIndex;
//           materialName = children.material[materialIndex].name;
//           console.log(materialName);
//           console.log(children.material[materialIndex].name);
//           break;
//         } else {
//           upFaceIndex = null;
//         }
//       }
//     }
//   }
// }

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
    const sides = { R: 0, L: 1, U: 2, D: 3, F: 4, B: 5 };
    const materials = {
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
        const cubeIndex = sideFindCubeIndex[faces];
        console.log(faces);
        console.log("cubeIndex: ", cubeIndex);
        const sideIndex = sides[faces[i]];
        console.log("face :", faces[i]);
        console.log("sideIndex :", sideIndex);
        console.log("dataset faces: ", dataset[faces]);
        const colorNeedToFill = dataset[faces][i];
        console.log("colorNeedToFill :", colorNeedToFill);
        const colorMaterial = materials[colorNeedToFill];
        getCubeByCubeIndex(cubeIndex).material[sideIndex] = colorMaterial;
      }
    }
    console.log("filled");
  } catch (err) {
    console.log(err);
  }
}

//solve
function moveCubeTimeOut(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function moveCubeByList(instructions) {
  for (let step of instructions) {
    console.log(step);
    moveCubeByInstruction(step);
    await moveCubeTimeOut(2000);
  }
}

export function resetCubeState() {
  console.log();
  for (let i = 0; i < 27; i++) {
    const needToDeleteCube = getCubeByCubeIndex(i);
    scene.remove(needToDeleteCube);
  }
  threeStart();
  updateCubeStatus();
}
