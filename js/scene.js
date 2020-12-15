/** Scene */

import * as THREE from 'three';

class Scene {
  constructor() {
    this.scene = new THREE.Scene();
    this.buildScene();
  }

  buildScene() {
    const mat = new THREE.MeshStandardMaterial({color: 0xffffff});
    const geo = new THREE.BoxBufferGeometry(10, 1, 10);
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.y = -0.5;
    this.scene.add(mesh);

    const amb = new THREE.AmbientLight(0xffffff, 0.25);
    this.scene.add(amb);
  }

  getScene() {
    return this.scene;
  }
}

export default Scene;
