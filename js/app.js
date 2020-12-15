/** Entry */

import Camera from './camera.js';
import Loop from './loop.js';
import Renderer from './renderer.js';
import Scene from './scene.js';

class App {
  constructor() {
    this.modules = {};
    this.modules.camera = new Camera();
    this.modules.loop = new Loop();
    this.modules.renderer = new Renderer();
    this.modules.scene = new Scene();

    // bind modules
    for (const key in this.modules) {
      if (typeof(this.modules[key].bind) == 'function')
        this.modules[key].bind(this);
    }

    // run
    this.modules.loop.start();
  }
}

window.addEventListener('load', () => {
  const app = new App();
});
