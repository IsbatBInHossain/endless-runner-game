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
    ctx.save()
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fillStyle = this.color
    ctx.fill()
    ctx.restore()
  }
}
export class Fire extends Particle {
  constructor(game, x, y) {
    super(game)
    this.x = x
    this.y = y
    this.image = document.getElementById('fire')
    this.size = Math.random() * 50 + 50
    this.speedX = 1
    this.speedY = 1
    this.angle = 0
    this.va = Math.random() * 0.2 - 0.1
    this.amp = 2
  }
  update() {
    super.update()
    this.angle += this.va
    this.x += this.amp * Math.sin(this.angle * 5)
  }
  draw(ctx) {
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.rotate(this.angle)
    ctx.drawImage(
      this.image,
      -this.size * 0.5,
      -this.size * 0.5,
      this.size,
      this.size
    )
    ctx.restore()
  }
}
export class Splash extends Particle {
  constructor(game, x, y) {
    super(game)
    this.x = x
    this.y = y
    this.image = document.getElementById('fire')
    this.size = Math.random() * 100 + 100
    this.speedX = Math.random() * 6 - 3
    this.speedY = Math.random() * 2 + 2
    this.gravity = 0
  }
  update() {
    super.update()
    this.gravity += 0.05
    this.y += this.gravity
  }
  draw(ctx) {
    ctx.drawImage(this.image, this.x, this.y, this.size, this.size)
  }
}
