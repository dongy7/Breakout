import Brick from './brick';

class BrickRow extends Phaser.Group {
  constructor({ game, brickTypes, brickProps }) {
    super(game);
    this.game = game;
    this.brickTypes = brickTypes;
    this.brickWidth = brickProps.width;
    this.brickHeight = brickProps.height;
    this.createBricks();
  }

  createBricks() {
    for (let i = 0; i < this.brickTypes.length; i++) {
      for (let j = 0; j < this.game.width; j += this.brickWidth) {
        this.add(new Brick({
          game: this.game,
          x: j,
          y: (i + 1) * this.brickHeight,
          asset: this.brickTypes[i],
        }));
      }
    }
  }
}

export default BrickRow;
