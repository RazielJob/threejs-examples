import * as THREE from "three";

import { OrbitControls } from "three/addons/controls/OrbitControls.js";

let camera, controls, scene, renderer;

init();
//render(); // remove when using animation loop
// funcion para inicializar el programa
function init() {
  //Instancia el objeto scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x1b7cc9);
  scene.fog = new THREE.FogExp2(0x9f2, 0.0015);
  console.log(scene);

  //El Antialias refina los elementos 3D
  renderer = new THREE.WebGLRenderer({ antialias: true });
  //colorcar el pixel de la rederizaicon con el de la pantalla
  renderer.setPixelRatio(window.devicePixelRatio);
  //Tamaño de la escena
  renderer.setSize(window.innerWidth, window.innerHeight);
  //Como se va a trabajar la animaciion
  renderer.setAnimationLoop(animate);
  //En el html (parecido al canvas donde se pone la animacion)
  document.body.appendChild(renderer.domElement);

  //Coloca una capara predeterminada
  camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.set(400, 200, 0);

  // controls

  controls = new OrbitControls(camera, renderer.domElement);
  controls.listenToKeyEvents(window); // optional

  controls.addEventListener("change", render); // call this only in static scenes (i.e., if there is no animation loop)

  controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
  controls.dampingFactor = 0.05;

  controls.screenSpacePanning = false;

  controls.minDistance = 100;
  controls.maxDistance = 500;

  controls.maxPolarAngle = Math.PI / 2;

  // world

  const geometry = new THREE.ConeGeometry(10, 10, 10, 2);
  const material = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    flatShading: true,
  });

  //Dibuja la cantidad de piramides
  for (let i = 0; i < 1000; i++) {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = Math.random() * 1600 - 800;
    mesh.position.y = 0;
    mesh.position.z = Math.random() * 1600 - 800;
    mesh.updateMatrix();
    mesh.matrixAutoUpdate = false;
    scene.add(mesh);
  }

  // lights

  const dirLight1 = new THREE.DirectionalLight(0x150002, 3);
  dirLight1.position.set(1, 1, 1);
  scene.add(dirLight1);

  /*const dirLight2 = new THREE.DirectionalLight(0x002288, 3);
    dirLight2.position.set(- 1, - 1, - 1);
    scene.add(dirLight2);*/

  const ambientLight = new THREE.AmbientLight(0xab00c45);
  scene.add(ambientLight);

  //

  window.addEventListener("resize", onWindowResize);
}

//Se redibuja
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

//
function animate() {
  controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true

  render();
}

//redibujar todo el escenario
function render() {
  renderer.render(scene, camera);
}
