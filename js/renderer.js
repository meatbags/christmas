/** Renderer */

import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { AfterimagePass } from 'three/examples/jsm/postprocessing/AfterimagePass.js';

class Renderer {
  constructor() {
    this.renderer = new THREE.WebGLRenderer({antialiasing: true});
    document.querySelector('#renderer-target').appendChild(this.renderer.domElement);
  }

  bind(root) {
    this.ref = {};
    this.ref.scene = root.modules.scene;
    this.ref.camera = root.modules.camera;

    // effect composer
    this.passRender = new RenderPass(this.ref.scene.getScene(), this.ref.camera.getCamera());
    this.passAfterimage = new AfterimagePass();
    this.passAfterimage.uniforms.damp.value = 0.75;
    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(this.passRender);
    this.composer.addPass(this.passAfterimage);

    // events
    this.resize();
    window.addEventListener('resize', () => {
      this.resize();
    })
  }

  getDomElement() {
    return this.renderer.domElement;
  }

  resize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.renderer.setSize(w, h);
    this.composer.setSize(w, h);
  }

  render(delta) {
    // this.renderer.render(this.ref.scene.getScene(), this.ref.camera.getCamera());
    this.composer.render(delta);
  }
}

export default Renderer;
