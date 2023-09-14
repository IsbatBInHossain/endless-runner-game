class Enemy {
  constructor() {
    this.frameX = 0
    this.fps = 20
    this.frameInterval = 1000 / this.fps
    this.timer = 0
    this.markedForDeletion = false
  }
  update(deltatime) {
    // Movement
    this.x -= this.speedX + this.game.speed
    this.y += this.speedY

    // Animation
    if (this.timer > this.frameInterval) {
      this.timer = 0
      if (this.frameX >= this.maxFrame) this.frameX = 0
      else this.frameX++
    } else this.timer += deltatime

    // Delete Enemies
    if (this.x < -this.width) this.markedForDeletion = true
  }
  draw(ctx) {
    if (this.game.debug) {
      ctx.save()
      ctx.strokeStyle = 'red'
      ctx.strokeRect(this.x, this.y, this.width, this.height)
      ctx.restore()
    }
    ctx.drawImage(
      this.image,
      this.width * this.frameX,
      0,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    )
  }
}

export class FlyingEnemies extends Enemy {
  constructor(game) {
    super()
    this.game = game
    this.image = document.getElementById('fly')
    this.width = 60
    this.height = 44
    this.x = this.game.width + Math.random() * this.game.width * 0.5
    this.y = Math.random() * this.game.height * 0.5
    this.speedX = 2
    this.speedY = 0
    this.maxFrame = 5
    this.angle = 0
    this.amplitude = Math.random() * 2 + 1
    this.vw = Math.random() * 0.1 + 0.1
  }
  update(deltatime) {
    super.update(deltatime)
    this.angle += this.vw
    this.y += this.amplitude * Math.sin(this.angle)
  }
}
export class GroundEnemies extends Enemy {
  constructor(game) {
    super()
    this.game = game
    this.image = document.getElementById('plant')
    this.width = 60
    this.height = 87
    this.x = this.game.width
    this.y = this.game.height - this.game.groundMargin - this.height
    this.speedX = 0
    this.speedY = 0
    this.maxFrame = 1
  }
}
export class ClimbingEnemies extends Enemy {
  constructor(game) {
    super()
    this.game = game
    this.image = document.getElementById('spider-big')
    this.width = 120
    this.height = 144
    this.x = this.game.width
    this.y = Math.random() * this.game.height * 0.5
    this.speedX = 0
    this.speedY = Math.random() > 0.45 ? 1 : -1
    this.maxFrame = 5
  }
  update(deltatime) {
    super.update(deltatime)
    if (this.y > this.game.height - this.game.groundMargin - this.height)
      this.speedY = -1
    if (this.y < -this.height) this.markedForDeletion = true
  }
  draw(ctx) {
    super.draw(ctx)
    ctx.beginPath()
    ctx.moveTo(this.x + this.width * 0.5, 0)
    ctx.lineTo(this.x + this.width * 0.5, this.y + 50)
    ctx.stroke()
  }
}
