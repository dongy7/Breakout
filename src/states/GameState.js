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

  initializeProps() {
    const props = {};

		const center = {
      x: this.game.world.centerX,
      y: this.game.world.centerY
    };

    const brickProps = {
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

    const paddleWidth = 104;
    const paddleHeight = 24;
    const paddleOffsetY = 200;

    const paddleProps = {
      width: paddleWidth,
      height: paddleHeight,
      initialX: center.x - (paddleWidth / 2),
      initialY: center.y + paddleOffsetY,
    };

    const ballProps = {
      initialX: center.x,
      initialY: center.y,
      initialVelocityX: 0,
      initialVelocityY: 300,
    }

    props.center = center;
    props.brickProps = brickProps;
    props.brickTypes = brickTypes;
    props.paddleProps = paddleProps;
    props.ballProps = ballProps;

    return props;
  }

  create() {
    this.props = this.initializeProps();

    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.createBricks();
    this.createBall();
    this.createPaddle();

    this.cursors = this.game.input.keyboard.createCursorKeys();
  }

  update() {
    this.hitPaddle = this.game.physics.arcade.collide(this.ball, this.paddle);
    this.hitBrick = this.game.physics.arcade.collide(this.ball, this.bricks);

    this.paddle.body.velocity.x = this.props.ballProps.initialVelocityX;

    const velocity = this.props.ballProps.initialVelocityY;

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
    this.bricks = this.game.add.group();
    this.bricks.enableBody = true;

    const brickProps = this.props.brickProps;

    for (let i = 0; i < this.props.brickTypes.length; i++) {
      for (let j = 0; j < this.game.width; j += brickProps.width) {
        const brick = this.bricks.create(
          j, i * brickProps.height + brickProps.paddingTop, this.props.brickTypes[i]
        );
        brick.body.immovable = true;
      }
    }
  }

  createBall() {
    this.ball = this.game.add.sprite(this.props.ballProps.initialX, this.props.ballProps.initialY, 'ball');
    this.game.physics.arcade.enable(this.ball);
    this.ball.body.collideWorldBounds = true;
    this.ball.body.bounce.setTo(1, 1);
    this.ball.body.velocity.y = this.props.ballProps.initialVelocityY;
  }

  createPaddle() {
    this.paddle = this.game.add.sprite(this.props.paddleProps.initialX, this.props.paddleProps.initialY, 'paddle');

    this.game.physics.arcade.enable(this.paddle);
    this.paddle.body.collideWorldBounds = true;
    this.paddle.body.immovable = true;
  }

  reset() {
    this.ball.body.x = this.props.ballProps.initialX;
    this.ball.body.y = this.props.ballProps.initialY;
    this.ball.body.velocity.x = this.props.ballProps.initialVelocityX;
    this.ball.body.velocity.y = this.props.ballProps.initialVelocityY;

    this.paddle.body.x = this.props.paddleProps.initialX;
    this.paddle.body.y = this.props.paddleProps.initialY;
  }
}

export default GameState;
