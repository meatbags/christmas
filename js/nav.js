class Nav {
  constructor() {
    this.el = {};
    this.el.start = document.querySelector('#button-start');
  }

  bind(root) {
    this.ref = {};
    this.ref.rotunda = root.modules.rotunda;

    this.el.start.addEventListener('click', () => {
      this.ref.rotunda.toggle();
      this.el.start.classList.toggle('active');
    });
  }
}

export default Nav;
