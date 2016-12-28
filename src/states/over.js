class Over extends Phaser.State {
  create() {
    this.gameOverTitle = new Phaser.BitmapText(
      this.game, this.game.world.centerX, this.game.world.centerY, 'carrier_command', 'Game Over', 32
    );
    this.gameOverTitle.anchor.setTo(0.5, 0.5);

    this.restartTitle = new Phaser.BitmapText(
      this.game, this.game.world.centerX, this.game.world.centerY + 32, 'carrier_command', 'Try Again', 16
    );
    this.restartTitle.anchor.setTo(0.5, 0.5);

    this.restartTitle.inputEnabled = true;
    this.restartTitle.events.onInputDown.add(() => {
      this.state.start('play');
    }, this);

    this.gameOverPanel = this.add.group();
    this.gameOverPanel.add(this.gameOverTitle);
    this.gameOverPanel.add(this.restartTitle);
  }
}

export default Over;
