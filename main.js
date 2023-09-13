import Player from './player.js'
import InputHandler from './input.js'
import Background from './background.js'

window.addEventListener('load', () => {
  const canvas = document.getElementById('canvas1')
  const context = canvas.getContext('2d')
  canvas.width = 500
  canvas.height = 500

  class Game {
    constructor(width, height) {
      this.width = width
      this.height = height
      this.groundMargin = 80
      this.player = new Player(this)
      this.input = new InputHandler()
      this.background = new Background(this)
      this.speed = 0
      this.maxSpeed = 3
    }
    update(deltatime) {
      this.background.update()
      this.player.update(this.input.keys, deltatime)
    }
    draw(context) {
      this.background.draw(context)
      this.player.draw(context)
    }
  }

  const game = new Game(canvas.width, canvas.height)
  let lastTime = 0

  const animate = timestamp => {
    const deltatime = timestamp - lastTime
    lastTime = timestamp
    context.clearRect(0, 0, canvas.width, canvas.height)
    game.draw(context)
    game.update(deltatime)
    requestAnimationFrame(animate)
  }
  animate(0)
})
