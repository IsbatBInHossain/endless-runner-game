import {
  Diving,
  Falling,
  Hit,
  Jumping,
  Rolling,
  Running,
  Sitting,
} from './playerStates.js'

import CollisionAnimation from './collisionAnimation.js'
import FloatingMessage from './floatingMessages.js'

export default class Player {
  constructor(game) {
    this.game = game
    this.image = document.getElementById('player')
    this.width = 100
    this.height = 91.3
    this.x = 0
    this.ground = this.game.height - this.height - this.game.groundMargin
    this.y = this.ground
    this.vx = 0
    this.vy = 0
    this.weight = 1
    this.maxSpeed = 5
    this.jumpForce = 25
    this.frameX = 0
    this.frameY = 0
    this.currentState = null
    this.maxFrame = 4
    this.fps = 20
    this.timer = 0
    this.frameInterval = 1000 / this.fps
    this.states = [
      new Sitting(this.game),
      new Running(this.game),
      new Jumping(this.game),
      new Falling(this.game),
      new Rolling(this.game),
      new Diving(this.game),
      new Hit(this.game),
    ]
  }
  update(input, deltatime) {
    this.checkCollision()
    this.currentState.inputHandler(input)
    // Horizontal movement
    this.x += this.vx
    if (input.includes('ArrowRight') && this.currentState != this.states[6])
      this.vx = this.maxSpeed
    else if (input.includes('ArrowLeft') && this.currentState != this.states[6])
      this.vx = -this.maxSpeed
    else this.vx = 0

    // Horizontal boundary
    if (this.x < 0) this.x = 0
    if (this.x >= this.game.width - this.width)
      this.x = this.game.width - this.width

    this.y += this.vy
    this.vy += this.weight

    // Vertical boundary
    if (this.y < 0) this.y = 0
    if (this.y >= this.ground) {
      this.y = this.ground
      this.vy = 0
    }

    // Sprite animation
    if (this.timer > this.frameInterval) {
      if (this.frameX < this.maxFrame) {
        this.frameX++
      } else this.frameX = 0
      this.timer = 0
    } else this.timer += deltatime
  }

  draw(ctx) {
    if (this.game.debug) {
      ctx.save()
      ctx.strokeStyle = 'blue'
      ctx.strokeRect(this.x, this.y, this.width, this.height)
      ctx.restore()
    }
    ctx.drawImage(
      this.image,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    )
  }

  onGround() {
    return this.y >= this.ground
  }

  setState(state, speed) {
    this.currentState = this.states[state]
    this.game.speed = this.game.maxSpeed * speed
    this.currentState.enter()
  }

  checkCollision() {
    this.game.enemies.forEach(enemy => {
      if (
        enemy.x < this.x + this.width &&
        this.x < enemy.x + enemy.width &&
        enemy.y < this.y + this.height &&
        this.y < enemy.y + enemy.height
      ) {
        enemy.markedForDeletion = true
        this.game.collisions.push(
          new CollisionAnimation(
            this.game,
            enemy.x + enemy.width * 0.5,
            enemy.y + enemy.height * 0.5
          )
        )
        if (
          this.currentState === this.states[4] ||
          this.currentState === this.states[5]
        ) {
          this.game.score++
          this.game.floatingMessages.push(
            new FloatingMessage('+1', enemy.x, enemy.y, 120, 45)
          )
        } else {
          this.setState(6, 0)
          this.game.lives--
          if (this.game.lives <= 0) this.game.gameOver = true
        }
      }
    })
  }
}
