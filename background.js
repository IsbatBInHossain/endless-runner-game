class Layer {
  constructor(game, width, height, speedModifier, image) {
    this.game = game
    this.width = width
    this.height = height
    this.speedModifier = speedModifier
    this.image = image
    this.x = 0
    this.y = 0
  }
  update() {
    if (this.x < -this.width) this.x = 0
    else this.x -= this.game.speed * this.speedModifier
  }
  draw(ctx) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    ctx.drawImage(
      this.image,
      this.x + this.width,
      this.y,
      this.width,
      this.height
    )
  }
}

export default class Background {
  constructor({ game, setting }) {
    this.game = game
    this.width = 1667
    this.height = 500
    this.layer1Image = new Image()
    this.layer1Image.src = `/assets/Backgrounds/${setting}/layer-1.png`
    this.layer2Image = new Image()
    this.layer2Image.src = `/assets/Backgrounds/${setting}/layer-2.png`
    this.layer3Image = new Image()
    this.layer3Image.src = `/assets/Backgrounds/${setting}/layer-3.png`
    this.layer4Image = new Image()
    this.layer4Image.src = `/assets/Backgrounds/${setting}/layer-4.png`
    this.layer5Image = new Image()
    this.layer5Image.src = `/assets/Backgrounds/${setting}/layer-5.png`
    this.layer1 = new Layer(
      this.game,
      this.width,
      this.height,
      0,
      this.layer1Image
    )
    this.layer2 = new Layer(
      this.game,
      this.width,
      this.height,
      0.2,
      this.layer2Image
    )
    this.layer3 = new Layer(
      this.game,
      this.width,
      this.height,
      0.4,
      this.layer3Image
    )
    this.layer4 = new Layer(
      this.game,
      this.width,
      this.height,
      0.8,
      this.layer4Image
    )
    this.layer5 = new Layer(
      this.game,
      this.width,
      this.height,
      1,
      this.layer5Image
    )
    this.backgroundLayers = [
      this.layer1,
      this.layer2,
      this.layer3,
      this.layer4,
      this.layer5,
    ]
  }
  update() {
    this.backgroundLayers.forEach(layer => layer.update())
  }
  draw(context) {
    this.backgroundLayers.forEach(layer => layer.draw(context))
  }
}
