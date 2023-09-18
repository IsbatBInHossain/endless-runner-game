export default class UI {
  constructor(game) {
    this.game = game
    this.fontSize = 30
    this.fontFamily = 'Creepster'
    this.xShift = 3
    this.yShift = 3
    this.compFontColor = 'black'
    this.livesImage = document.getElementById('lives')
  }
  draw(ctx) {
    ctx.save()
    // Score
    ctx.font = this.fontSize + 'px ' + this.fontFamily
    ctx.fillStyle = this.game.fontColor
    ctx.textAlign = 'left'
    ctx.fillText(`Score: ${this.game.score}`, 20, 50)
    ctx.fillStyle = this.compFontColor
    ctx.fillText(
      `Score: ${this.game.score}`,
      20 + this.xShift,
      50 + this.yShift
    )

    // Timer
    ctx.font = this.fontSize * 0.8 + 'px ' + this.fontFamily
    ctx.fillStyle = this.game.fontColor
    ctx.fillText(`Time: ${this.#formatTime(this.game.time)}`, 20, 80)
    ctx.fillStyle = this.compFontColor
    ctx.fillText(
      `Time: ${this.#formatTime(this.game.time)}`,
      20 + this.xShift,
      80 + this.yShift
    )

    // Lives
    for (let i = 0; i < this.game.lives; i++)
      ctx.drawImage(this.livesImage, 20 + 25 * i, 95, 25, 25)

    // Game over
    if (this.game.gameOver) {
      ctx.textAlign = 'center'
      if (this.game.score > 10) {
        ctx.font = this.fontSize * 2 + 'px ' + this.fontFamily
        ctx.fillStyle = this.game.fontColor
        ctx.fillText(
          `Boo-yah`,
          this.game.width * 0.5,
          this.game.height * 0.5 - 20
        )
        ctx.font = this.fontSize * 0.7 + 'px ' + this.fontFamily
        ctx.fillText(
          'What are the creatures of nightmare afraid of? YOU!!!',
          this.game.width * 0.5,
          this.game.height * 0.5 + 20
        )
        ctx.font = this.fontSize * 2 + 'px ' + this.fontFamily
        ctx.fillStyle = this.compFontColor
        ctx.fillText(
          `Boo-yah`,
          this.game.width * 0.5 + this.xShift,
          this.game.height * 0.5 - 20 + this.yShift
        )
        ctx.font = this.fontSize * 0.7 + 'px ' + this.fontFamily
        ctx.fillText(
          'What are the creatures of nightmare afraid of? YOU!!!',
          this.game.width * 0.5 + this.xShift,
          this.game.height * 0.5 + 20 + this.yShift
        )
      } else {
        ctx.font = this.fontSize * 1.5 + 'px ' + this.fontFamily
        ctx.fillStyle = this.game.fontColor
        ctx.fillText(
          `Love at first bite???`,
          this.game.width * 0.5,
          this.game.height * 0.5 - 20
        )
        ctx.font = this.fontSize * 0.7 + 'px ' + this.fontFamily
        ctx.fillText(
          'Nope. Better luck next time',
          this.game.width * 0.5,
          this.game.height * 0.5 + 20
        )
        ctx.fillStyle = this.compFontColor
        ctx.font = this.fontSize * 1.5 + 'px ' + this.fontFamily
        ctx.fillText(
          `Love at first bite???`,
          this.game.width * 0.5 + 3,
          this.game.height * 0.5 - 20 + 3
        )
        ctx.font = this.fontSize * 0.7 + 'px ' + this.fontFamily
        ctx.fillText(
          'Nope. Better luck next time',
          this.game.width * 0.5,
          this.game.height * 0.5 + 20
        )
      }
    }
    ctx.restore()
  }
  #formatTime(time) {
    const formattedTime = ((this.game.maxTime - time) / 1000).toFixed(2)
    if (formattedTime > 0) return formattedTime
    else return (0).toFixed(2)
  }
}
