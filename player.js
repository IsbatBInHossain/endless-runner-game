export default class Player {
  constructor(game) {
    this.game = game;
    this.width = 100;
    this.height = 91.3;
    this.image = document.getElementById('player');
    this.x = 0;
    this.y = this.game.height - this.height;
    this.vx = 0;
    this.vy = 0;
    this.weight = 1;
    this.maxSpeed = 5;
    this.jumpForce = 20;
  }
  update(input) {
    // Horizontal movement
    this.x += this.vx;
    if (input.includes('ArrowRight')) this.vx = this.maxSpeed;
    else if (input.includes('ArrowLeft')) this.vx = -this.maxSpeed;
    else this.vx = 0;

    // Horizontal boundary
    if (this.x < 0) this.x = 0;
    if (this.x >= this.game.width - this.width)
      this.x = this.game.width - this.width;

    // Vertical Movement
    this.y += this.vy;
    if (input.includes('ArrowUp') && this.onGround()) {
      this.vy = -this.jumpForce;
    }
    this.vy += this.weight;

    // Vertical boundary
    if (this.y < 0) this.y = 0;
    if (this.y >= this.game.height - this.height) {
      this.y = this.game.height - this.height;
      this.vy = 0;
    }
  }

  onGround() {
    return this.y >= this.game.height - this.height;
  }
  draw(ctx) {
    ctx.drawImage(
      this.image,
      0,
      0,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}
