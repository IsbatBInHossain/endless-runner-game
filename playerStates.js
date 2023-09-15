import { Dust } from './particle.js'

const states = {
  SITTING: 0,
  RUNNING: 1,
  JUMPING: 2,
  FALLING: 3,
  ROLLING: 4,
}

class State {
  constructor(state, game) {
    this.state = state
    this.game = game
  }
}

export class Sitting extends State {
  constructor(game) {
    super('SITTING', game)
  }
  enter() {
    this.game.player.frameY = 5
    this.game.player.frameX = 0
    this.game.player.maxFrame = 4
  }
  inputHandler(input) {
    if (input.includes('ArrowLeft') || input.includes('ArrowRight'))
      this.game.player.setState(states.RUNNING, 1)
    else if (input.includes('Enter'))
      this.game.player.setState(states.ROLLING, 2)
  }
}
export class Running extends State {
  constructor(game) {
    super('RUNNING', game)
  }
  enter() {
    this.game.player.frameY = 3
    this.game.player.frameX = 0
    this.game.player.maxFrame = 8
  }
  inputHandler(input) {
    this.game.particles.push(
      new Dust(this.game, this.game.player.x, this.game.player.y)
    )
    if (input.includes('ArrowDown'))
      this.game.player.setState(states.SITTING, 0)
    else if (input.includes('ArrowUp'))
      this.game.player.setState(states.JUMPING, 1)
    else if (input.includes('Enter'))
      this.game.player.setState(states.ROLLING, 2)
  }
}
export class Jumping extends State {
  constructor(game) {
    super('JUMPING', game)
  }
  enter() {
    if (this.game.player.onGround())
      this.game.player.vy -= this.game.player.jumpForce
    this.game.player.frameY = 1
    this.game.player.frameX = 0
    this.game.player.maxFrame = 6
  }
  inputHandler(input) {
    if (this.game.player.vy > this.game.player.weight) {
      this.game.player.setState(states.FALLING, 1)
    } else if (input.includes('Enter'))
      this.game.player.setState(states.ROLLING, 2)
  }
}
export class Falling extends State {
  constructor(game) {
    super('FALLING', game)
  }
  enter() {
    this.game.player.frameY = 2
    this.game.player.frameX = 0
    this.game.player.maxFrame = 6
  }
  inputHandler(input) {
    if (this.game.player.onGround()) {
      this.game.player.setState(states.RUNNING, 1)
    }
  }
}
export class Rolling extends State {
  constructor(game) {
    super('ROLLING', game)
  }
  enter() {
    this.game.player.frameY = 6
    this.game.player.frameX = 0
    this.game.player.maxFrame = 6
  }
  inputHandler(input) {
    if (!input.includes('Enter') && this.game.player.onGround()) {
      this.game.player.setState(states.RUNNING, 1)
    } else if (!input.includes('Enter') && !this.game.player.onGround()) {
      this.game.player.setState(states.FALLING, 1)
    } else if (
      input.includes('Enter') &&
      input.includes('ArrowUp') &&
      this.game.player.onGround()
    ) {
      this.game.player.vy -= this.game.player.jumpForce
    }
  }
}
