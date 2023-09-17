export default class UI {
  constructor(game) {
    this.game = game
    this.fontSize = 30
    this.fontFamily = 'Helvetica'
  }
  draw(ctx) {
    // Score
    ctx.font = this.fontSize + 'px ' + this.fontFamily
    ctx.fillStyle = this.game.fontColor
    ctx.textAlign = 'left'
    ctx.fillText(`Score: ${this.game.score}`, 20, 50)

    // Timer
    ctx.font = this.fontSize * 0.8 + 'px ' + this.fontFamily
    ctx.fillText(`Time: ${this.#formatTime(this.game.time)}`, 20, 80)

    // Game over
    if (this.game.gameOver) {
      ctx.textAlign = 'center'
      ctx.font = this.fontSize * 2 + 'px ' + this.fontFamily
      if (this.game.score > 10) {
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
      } else {
        ctx.font = this.fontSize * 1.5 + 'px ' + this.fontFamily
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
      }
    }
  }
  #formatTime(time) {
    const formattedTime = ((this.game.maxTime - time) / 1000).toFixed(2)
    if (formattedTime > 0) return formattedTime
    else return (0).toFixed(2)
  }
}
