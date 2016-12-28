class Brick extends Phaser.Sprite {
  constructor({ game, x, y, asset }) {
    super(game, x, y, asset);
    this.game.physics.arcade.enable(this);
    this.body.immovable = true;
  }
}

export default Brick;
