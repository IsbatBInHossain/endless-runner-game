class Enemy {
  constructor() {
    this.frameX = 0
    this.fps = 20
    this.frameInterval = 1000 / this.fps
    this.timer = 0
  }
  update(deltatime) {
    // Movement
    this.x += this.speedX
    this.y += this.speedY

    // Animation
    if (this.timer > this.frameInterval) {
      this.timer = 0
      if (this.frameX >= this.maxFrame) this.frameX = 0
      else this.frameX++
    } else this.timer += deltatime
  }
  draw(ctx) {
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
    this.x = 200
    this.y = 200
    this.speedX = 2
    this.speedY = 2
    this.maxFrame = 5
  }
  update(deltatime) {
    super.update(deltatime)
  }
}
export class GroundEnemies extends Enemy {
  constructor(game) {
    super()
    this.game = game
    this.image = document.getElementById('plant')
    this.width = 60
    this.height = 87
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
    this.maxFrame = 5
  }
  update(deltatime) {
    super.update(deltatime)
  }
}
