/** Renderer */

import * as THREE from 'three';

class Renderer {
  constructor() {
    this.renderer = new THREE.WebGLRenderer({antialiasing: true});
    document.querySelector('#renderer-target').appendChild(this.renderer.domElement);
  }

  bind(root) {
    this.ref = {};
    this.ref.scene = root.modules.scene;
    this.ref.camera = root.modules.camera;
    
    // events
    this.resize();
    window.addEventListener('resize', () => {
      this.resize();
    })
  }

  resize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.renderer.setSize(w, h);
  }

  render() {
    this.renderer.render(this.ref.scene.getScene(), this.ref.camera.getCamera());
  }
}

export default Renderer;
