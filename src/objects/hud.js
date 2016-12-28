import Heart from './heart';

class Hud extends Phaser.Group {
  constructor({ game, font }) {
    super(game);
    this.game = game;
    this.score = 0;
    this.lives = 3;

    this.scoreLabel = 'Score: ';
    this.scoreText = new Phaser.BitmapText(this.game, 0, 0, font, `Score: ${this.score}`, 16);
    this.hearts = this.createHearts();

    this.add(this.scoreText);
    this.add(this.hearts);
  }

  createHearts() {
    const hearts = new Phaser.Group(this.game);
    let posX = this.game.width - 32;

    for (let i = 0; i < this.lives; i++) {
      hearts.add(new Heart({
        game: this.game,
        x: posX,
        y: 0,
        scaleFactor: 0.25,
        asset: 'heart',
      }));

      posX -= 32;
    }

    return hearts;
  }
}

export default Hud;
