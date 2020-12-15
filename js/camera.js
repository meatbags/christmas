/** Camera */

import * as THREE from 'three';

class Camera {
  constructor() {
    this.camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100000);
    this.camera.up = new THREE.Vector3(0, 1, 0);
    this.camera.rotation.order = 'YXZ';
    this.camera.position.set(10, 10, 10);
    this.camera.updateProjectionMatrix();
    this.origin = new THREE.Vector3();
    this.age = 0;
    this.hz = 1 / 50;
  }

  bind(root) {
    this.resize();
    window.addEventListener('resize', () => { this.resize(); })
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
    this.age += delta;
    this.camera.position.x = Math.cos(this.age * Math.PI * 2 * this.hz) * 10;
    this.camera.position.z = Math.sin(this.age * Math.PI * 2 * this.hz) * 10;
    this.camera.lookAt(this.origin);
  }
}

export default Camera;
