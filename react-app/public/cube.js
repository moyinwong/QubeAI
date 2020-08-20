// import * as THREE from "./three";

const colors = {
  red: "#FF0000",
  blue: "#0000FF",
  white: "#FFFFFF",
  orange: "#FF6600",
  yellow: "#FFFF00",
  green: "#00FF00",
};

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//add orbitcontrols
controls = new THREE.OrbitControls(camera, renderer.domElement);

function makeCube(right, left, up, down, front, back, x, y, z) {
  const geometry = new THREE.BoxGeometry(1, 1, 1);

  const cubeColors = [
    new THREE.MeshBasicMaterial({
      color: right !== null ? right : colors.white,
    }), //right
    new THREE.MeshBasicMaterial({
      color: left !== null ? left : colors.white,
    }), //left
    new THREE.MeshBasicMaterial({ color: up !== null ? up : colors.white }), //up
    new THREE.MeshBasicMaterial({
      color: down !== null ? down : colors.white,
    }), //down
    new THREE.MeshBasicMaterial({
      color: front !== null ? front : colors.white,
    }), //front
    new THREE.MeshBasicMaterial({
      color: back !== null ? back : colors.white,
    }), //back
  ];

  const material = new THREE.MeshFaceMaterial(cubeColors);

  const cube = new THREE.Mesh(geometry, material);
  cube.position.x = x;
  cube.position.y = y;
  cube.position.z = z;

  scene.add(cube);
}

for (let x = -1.05; x <= 1.1; x += 1.05) {
  for (let y = -1.05; y <= 1.1; y += 1.05) {
    for (let z = -1.05; z <= 1.1; z += 1.05) {
      makeCube(
        colors.red,
        null,
        colors.red,
        colors.red,
        colors.red,
        colors.white,
        x,
        y,
        z
      );
    }
  }
}

// var geometry = new THREE.BoxGeometry(1, 1, 1);

// // cube 6 faces color
// const cubeColors = [
//   new THREE.MeshBasicMaterial({ color: colors.red }), //right
//   new THREE.MeshBasicMaterial({ color: colors.red }), //left
//   new THREE.MeshBasicMaterial({ color: colors.red }), //up
//   new THREE.MeshBasicMaterial({ color: colors.red }), //down
//   new THREE.MeshBasicMaterial({ color: colors.red }), //front
//   new THREE.MeshBasicMaterial({ color: colors.red }), //back
// ];

// var material = new THREE.MeshFaceMaterial(cubeColors);

// var cube = new THREE.Mesh(geometry, material);
// cube.position.x = -1;
// cube.position.y = 1;
// scene.add(cube);

var geometry2 = new THREE.BoxGeometry(1, 1, 1);
var material2 = new THREE.MeshBasicMaterial({ color: 0x00ffff });

var cube2 = new THREE.Mesh(geometry2, material2);
cube2.position.x = 0;
scene.add(cube2);

//add light
// const light = new THREE.DirectionalLight(0xffffff, 4);
// light.position.set(0, 1, 3);
// scene.add(light);

camera.position.z = 5;

var animate = function () {
  requestAnimationFrame(animate);
  //
  //
  //
  renderer.render(scene, camera);
};

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener("resize", onWindowResize, false);

animate();
