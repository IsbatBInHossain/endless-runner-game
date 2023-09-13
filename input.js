export default class InputHandler {
  constructor() {
    this.keys = [];
    window.addEventListener('keydown', e => {
      switch (e.key) {
        case 'ArrowDown':
        case 'ArrowUp':
        case 'ArrowLeft':
        case 'ArrowRight':
        case 'Enter':
          if (this.keys.indexOf(e.key) === -1) {
            this.keys.push(e.key);
          }
          break;
      }
    });
    window.addEventListener('keyup', e => {
      switch (e.key) {
        case 'ArrowDown':
        case 'ArrowUp':
        case 'ArrowLeft':
        case 'ArrowRight':
        case 'Enter':
          const index = this.keys.indexOf(e.key);
          if (index !== -1) {
            this.keys.splice(index, 1);
          }
          break;
      }
    });
  }
}
