import Player from './player.js';
import InputHandler from './input.js';

window.addEventListener('load', () => {
  const canvas = document.getElementById('canvas1');
  const context = canvas.getContext('2d');
  canvas.width = 500;
  canvas.height = 500;

  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.player = new Player(this);
      this.input = new InputHandler();
    }
    update(deltatime) {
      this.player.update(this.input.keys, deltatime);
    }
    draw(context) {
      this.player.draw(context);
    }
  }

  const game = new Game(canvas.width, canvas.height);
  let lastTime = 0;

  const animate = timestamp => {
    const deltatime = timestamp - lastTime;
    lastTime = timestamp;
    context.clearRect(0, 0, canvas.width, canvas.height);
    game.draw(context);
    game.update(deltatime);
    requestAnimationFrame(animate);
  };
  animate(0);
});
