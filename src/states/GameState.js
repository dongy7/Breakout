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

    this.cursors = this.game.input.keyboard.createCursorKeys();
  }

  update() {
    this.hitPaddle = this.game.physics.arcade.collide(this.ball, this.paddle);
    this.hitBrick = this.game.physics.arcade.collide(this.ball, this.bricks);

    this.paddle.body.velocity.x = 0;

    const velocity = 500;

    if (this.cursors.left.isDown) {
      this.paddle.body.velocity.x = -velocity;
    } else if (this.cursors.right.isDown) {
      this.paddle.body.velocity.x = velocity;
    }

    if (this.ball.body.blocked.down) {
      this.reset();
    }
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

    this.bricks = this.game.add.group();
    this.bricks.enableBody = true;

    for (let i = 0; i < brickTypes.length; i++) {
      for (let j = 0; j < this.game.width; j += brickInfo.width) {
        const brick = this.bricks.create(j, i * brickInfo.height + brickInfo.paddingTop, brickTypes[i]);
        brick.body.immovable = true;
      }
    }
  }

  createBall() {
    this.ballVelocity = 300;

    this.ball = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'ball');
    this.game.physics.arcade.enable(this.ball);
    this.ball.body.collideWorldBounds = true;
    this.ball.body.bounce.setTo(1, 1);
    this.ball.body.velocity.y = this.ballVelocity;
  }

  createPaddle() {
    const paddleInfo = {
      width: 104,
      height: 24,
    };

    const offsetY = 200;

    this.initialPaddleX = this.game.world.centerX - (paddleInfo.width / 2);
    this.initialPaddleY = this.game.world.centerY + offsetY;

    this.paddle = this.game.add.sprite(this.initialPaddleX, this.initialPaddleY, 'paddle');

    this.game.physics.arcade.enable(this.paddle);
    this.paddle.body.collideWorldBounds = true;
    this.paddle.body.immovable = true;
  }

  reset() {
    this.ball.body.x = this.game.world.centerX;
    this.ball.body.y = this.game.world.centerY;
    this.ball.body.velocity.x = 0;
    this.ball.body.velocity.y = this.ballVelocity;

    this.paddle.body.x = this.initialPaddleX;
    this.paddle.body.y = this.initialPaddleY;
  }
}

export default GameState;
