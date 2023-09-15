class Particle {
  constructor(game) {
    this.game = game
    this.markedForDeletion = false
  }
  update() {
    this.x -= this.speedX + this.game.speed
    this.y -= this.speedY
    this.size *= 0.95
    if (this.size <= 0.5) this.markedForDeletion = true
  }
}

export class Dust extends Particle {
  constructor(game, x, y) {
    super(game)
    this.x = x
    this.y = y
    this.size = Math.random() * 10 + 10
    this.speedX = Math.random()
    this.speedY = Math.random()
    this.color = 'rgba(0, 0, 0, 0.2)'
  }
  draw(ctx) {
    ctx.beginPath()
    ctx.arc(
      this.x + this.game.player.width * 0.5,
      this.y + this.game.player.height + Math.random() * 5 - 5,
      this.size,
      0,
      Math.PI * 2
    )
    ctx.fillStyle = this.color
    ctx.fill()
  }
}
