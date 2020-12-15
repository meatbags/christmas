/** Camera */

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

class Camera {
  constructor() {
    this.camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100000);
    this.camera.up = new THREE.Vector3(0, 1, 0);
    this.camera.rotation.order = 'YXZ';
    this.camera.position.set(10, 5, 10);
    this.camera.updateProjectionMatrix();
    this.origin = new THREE.Vector3();
    //this.age = 0;
    //this.hz = 1 / 50;
  }

  bind(root) {
    this.ref = {};
    this.ref.renderer = root.modules.renderer;

    // orbit controls
    this.controls = new OrbitControls(this.camera, this.ref.renderer.getDomElement());
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.maxDistance = 30;
    this.controls.minDistance = 5;

    this.resize();
    window.addEventListener('resize', () => { this.resize(); });
  }

  resize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  }

  getCamera() {
    return this.camera;
  }

  update(delta) {
    this.controls.update();
  }
}

export default Camera;
