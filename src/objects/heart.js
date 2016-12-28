class Heart extends Phaser.Sprite {
  constructor({ game, x, y, asset, scaleFactor }) {
    super(game, x, y, asset);
    this.scale.setTo(scaleFactor);
  }
}

export default Heart;
