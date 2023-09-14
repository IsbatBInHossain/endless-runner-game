import Player from './player.js'
import InputHandler from './input.js'
import Background from './background.js'
import { ClimbingEnemies, FlyingEnemies, GroundEnemies } from './Enemy.js'
import UI from './UI.js'

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
      this.input = new InputHandler(this)
      this.background = new Background(this)
      this.UI = new UI(this)
      this.speed = 0
      this.maxSpeed = 3
      this.enemies = []
      this.enemyTimer = 0
      this.enemyInterval = 1000
      this.debug = false
      this.score = 0
      this.fontColor = 'black'
    }
    update(deltatime) {
      this.background.update()
      this.player.update(this.input.keys, deltatime)
      if (this.enemyTimer > this.enemyInterval) {
        this.enemyTimer = 0
        this.addEnemy()
      } else this.enemyTimer += deltatime

      this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion)
      this.enemies.forEach(enemy => enemy.update(deltatime))
    }
    draw(context) {
      this.background.draw(context)
      this.UI.draw(context)
      this.player.draw(context)
      this.enemies.forEach(enemy => enemy.draw(context))
    }
    addEnemy() {
      this.enemies.push(new FlyingEnemies(this))
      if (this.speed > 0 && Math.random() > 0.5)
        this.enemies.push(new GroundEnemies(this))
      else if (this.speed > 0) this.enemies.push(new ClimbingEnemies(this))
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
