class Ball extends Phaser.Sprite {
  constructor({ game, x, y, asset, initialVelocityY }) {
    super(game, x, y, asset);

    this.game = game;
    this.game.physics.arcade.enable(this);
    this.body.collideWorldBounds = true;
    this.body.bounce.setTo(1, 1);
    this.initialVelocityY = initialVelocityY;
  }

  start() {
    this.body.velocity.y = this.initialVelocityY;
  }
}

export default Ball;
