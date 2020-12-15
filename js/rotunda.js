/** Rotunda */

import * as THREE from 'three';

class Rotunda {
  constructor() {
    this.divisions = 32;
    this.rot = {speed: 0, target: 0};
    this.group = new THREE.Group();

    // test
    const geo = new THREE.SphereBufferGeometry(0.05, 3, 3);
    const mat = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const mesh = new THREE.Mesh(geo, mat);
    for (let i=0; i<10; i++) {
      const x = (Math.random() * 2 - 1) * 5;
      const y = (Math.random() * 2 - 1) * 5;
      const z = (Math.random() * 2 - 1) * 5;
      const v = new THREE.Vector3(
        Math.random() * 2 - 1,
        Math.random() * 2 - 1,
        Math.random() * 2 - 1
      );
      v.normalize();
      v.multiplyScalar(1 + Math.random() * 1);
      const tOff = Math.random();
      const callback = (mesh, t) => {
        //t = Math.sin(((t + tOff) % 1) * Math.PI * 2);
        mesh.position.x = x + v.x * t;
        mesh.position.y = y + v.y * t;
        mesh.position.z = z + v.z * t;
      };
      this.createAnimation(mesh, callback);
    }
  }

  bind(root) {
    this.ref = {};
    this.ref.scene = root.modules.scene;
    this.ref.scene.getScene().add(this.group);
  }

  createAnimation(mesh, callback) {
    for (let i=0; i<this.divisions; i++) {
      let t = i / this.divisions;
      callback(mesh, t);
      const clone = mesh.clone();
      clone.geometry = clone.geometry.clone();
      clone.updateMatrix();
      clone.geometry.applyMatrix4(clone.matrix);
      clone.position.set(0, 0, 0);
      clone.rotation.set(0, t * Math.PI * 2, 0);
      clone.updateMatrix();
      this.group.add(clone);
    }
  }

  toggle() {
    this.rot.target = this.rot.target == 1 ? 0 : 1;
  }

  update(delta) {
    if (this.rot.speed !== this.rot.target) {
      const sign = Math.sign(this.rot.target - this.rot.speed);
      this.rot.speed += sign * delta * 0.1;

      if ((sign > 0 && this.rot.speed > this.rot.target) ||
        (sign < 0 && this.rot.speed < this.rot.target)) {
        this.rot.speed = this.rot.target;
      }
    }

    this.group.rotation.y += (Math.PI * 2 / this.divisions) * this.rot.speed;
  }
}

export default Rotunda;
