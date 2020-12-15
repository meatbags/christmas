/** Loop */

class Loop {
  constructor() {
    this.update = [];
    this.render = [];
    this.time = {
      now: Date.now(),
      deltaMax: 0.05,
    };
  }

  bind(root) {
    // populate targets
    for (const key in root.modules) {
      if (typeof(root.modules[key].update) == 'function')
        this.update.push(root.modules[key]);
      if (typeof(root.modules[key].render) == 'function')
        this.render.push(root.modules[key])
    }
  }

  start() {
    this.paused = false;
    this.time.now = Date.now();

    // start once
    if (!this.active) {
      this.active = true;
      this._loop();
    }
  }

  stop() {
    this.paused = true;
  }

  _loop() {
    requestAnimationFrame(() => {
      this._loop();
    });

    if (!this.paused) {
      const now = Date.now();
      const dt = Math.min(this.time.deltaMax, (now - this.time.now) / 1000);
      this.time.now = now;

      // update & render
      this.update.forEach(module => { module.update(dt); });
      this.render.forEach(module => { module.render(dt); });
    }
  }
}

export default Loop;
