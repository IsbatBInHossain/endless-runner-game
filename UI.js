export default class UI {
  constructor(game) {
    this.game = game
    this.fontSize = 30
    this.fontFamily = 'Helvetica'
  }
  draw(ctx) {
    ctx.font = this.fontSize + 'px ' + this.fontFamily
    ctx.filStyle = this.game.fontColor
    ctx.textAlign = 'left'
    ctx.fillText(`Score: ${this.game.score}`, 20, 50)
  }
}
