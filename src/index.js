import Play from './states/Play';
import Over from './states/Over';

class Game extends Phaser.Game {
  constructor() {
    super(1280, 720, Phaser.AUTO, 'content', null);
    this.state.add('play', Play, false);
    this.state.add('over', Over, false);
    this.state.start('play');
  }
}

new Game();
