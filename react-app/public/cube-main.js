let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;
const origPoint = new THREE.Vector3(0, 0, 0);
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let controller;
const viewCenter = new THREE.Vector3(0, 0, 0);
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
const flattedCubeStatus = {
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
//   width = window.innerWidth;
//   height = window.innerHeight;
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
camera.up.set(0, 1, 0); //正方向
camera.lookAt(origPoint);

//创建场景，后续元素需要加入到场景中才会显示出来

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
        cube.position.x == 0 &&
        cube.position.y == 0 &&
        cube.position.z == 50
      ) {
        cube.name = "F-Center";
      }

      if (
        cube.position.x == 0 &&
        cube.position.y == 0 &&
        cube.position.z == -50
      ) {
        cube.name = "B-Center";
      }

      if (
        cube.position.x == len &&
        cube.position.y == 0 &&
        cube.position.z == 0
      ) {
        cube.name = "R-Center";
      }

      if (
        cube.position.x == -len &&
        cube.position.y == 0 &&
        cube.position.z == 0
      ) {
        cube.name = "L-Center";
      }

      if (
        cube.position.x == 0 &&
        cube.position.y == len &&
        cube.position.z == 0
      ) {
        cube.name = "U-Center";
      }

      if (
        cube.position.x == 0 &&
        cube.position.y == -len &&
        cube.position.z == 0
      ) {
        cube.name = "D-Center";
      }

      if (
        cube.position.x == 0 &&
        cube.position.y == 0 &&
        cube.position.z == 0
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

  //not visible
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
document.getElementById("canvasVirtual").appendChild(renderer.domElement);

//start-------------------------------------------------------------------------------------------------------------------
function threeStart() {
  document.getElementById("canvasVirtual").appendChild(renderer.domElement);

  initObject();
  render();

  //add EventListener
  renderer.domElement.addEventListener("mousedown", startCube, false);
  renderer.domElement.addEventListener("mousemove", moveCube, false);
  renderer.domElement.addEventListener("mouseup", stopCube, false);

  renderer.domElement.addEventListener("touchstart", startCube, false);
  renderer.domElement.addEventListener("touchmove", moveCube, false);
  renderer.domElement.addEventListener("touchend", stopCube, false);

  controller = new THREE.OrbitControls(camera, renderer.domElement);
  controller.target = new THREE.Vector3(0, 0, 0);

  const allNotations = JSON.parse(sessionStorage.getItem("allNotations"));

  if (allNotations) {
    fillInColorsToCubes(allNotations);
  }
}

threeStart();

const scannedDataset = JSON.parse(sessionStorage.getItem("allNotations"));

if (scannedDataset) fillInColorsToCubes(scannedDataset);

moveCubeByList(["U'", "L'", "D", "R", "L'"]);
