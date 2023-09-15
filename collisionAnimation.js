export default class CollisionAnimation {
  constructor(game, x, y) {
    this.game = game
    this.image = document.getElementById('boom')
    this.spriteWidth = 100
    this.spriteHeight = 90
    this.sizeModifier = Math.random() + 0.5
    this.width = this.sizeModifier * this.spriteWidth
    this.height = this.sizeModifier * this.spriteHeight
    this.x = x - this.width * 0.5
    this.y = y - this.height * 0.5
    this.maxFrame = 4
    this.frameX = 0
    this.markedForDeletion = false
    this.timer = 0
    this.fps = 15
    this.frameInterval = 1000 / this.fps
  }
  update(deltatime) {
    this.x += this.game.speed
    if (this.timer > this.frameInterval) {
      if (this.frameX >= this.maxFrame) this.markedForDeletion = true
      else this.frameX++
      this.timer = 0
    } else this.timer += deltatime
  }
  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.frameX * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    )
  }
}
