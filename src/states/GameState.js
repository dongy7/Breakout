class GameState extends Phaser.State {
  preload() {
    this.game.load.image('ball', 'assets/ballGrey.png');
    this.game.load.image('paddle', 'assets/paddleBlu.png');
    this.game.load.image('blueBlock', 'assets/element_blue_square_glossy.png');
    this.game.load.image('greenBlock', 'assets/element_green_square_glossy.png');
    this.game.load.image('purpleBlock', 'assets/element_purple_cube_glossy.png');
    this.game.load.image('redBlock', 'assets/element_red_square_glossy.png');
    this.game.load.image('yellowBlock', 'assets/element_yellow_square_glossy.png');
    this.game.load.image('greyBlock', 'assets/element_grey_square_glossy.png');
  }

  create() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

		const center = {
      x: this.game.world.centerX,
      y: this.game.world.centerY
    };

    this.createBricks();
    this.createBall();
    this.createPaddle();
  }

  createBricks() {
    const brickInfo = {
      width: 32,
      height: 32,
      paddingTop: 32,
    };

    const brickTypes = [
      'redBlock',
      'yellowBlock',
      'greenBlock',
      'blueBlock',
      'purpleBlock',
    ];

    const bricks = this.game.add.group();
    bricks.enableBody = true;

    for (let i = 0; i < brickTypes.length; i++) {
      for (let j = 0; j < this.game.width; j += brickInfo.width) {
        const brick = bricks.create(j, i * brickInfo.height + brickInfo.paddingTop, brickTypes[i]);
        brick.body.immovable = true;
      }
    }
  }

  createBall() {
    const ball = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'ball');
    this.game.physics.arcade.enable(ball);
  }

  createPaddle() {
    const paddleInfo = {
      width: 104,
      height: 24,
    };

    const offsetY = 200;

    const paddleX = this.game.world.centerX - (paddleInfo.width / 2);
    const paddleY = this.game.world.centerY + offsetY;

    const paddle = this.game.add.sprite(paddleX, paddleY, 'paddle');

    this.game.physics.arcade.enable(paddle);
  }
}

export default GameState;
