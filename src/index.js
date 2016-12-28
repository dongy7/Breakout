import Play from 'states/Play';

class Game extends Phaser.Game {
  constructor() {
    super(1280, 720, Phaser.AUTO, 'content', null);
    this.state.add('play', Play, false);
    this.state.start('play');
  }
}

new Game();
