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
    this.game.load.image('heart', 'assets/heart.png');
    this.game.load.bitmapFont('carrier_command', 'assets/fonts/carrier_command.png', 'assets/fonts/carrier_command.xml');
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
      segments: 8,
      segmentAngle: 15,
    };

    const ballProps = {
      initialX: center.x,
      initialY: center.y,
      initialVelocityX: 0,
      initialVelocityY: 300,
    };

    const heartProps = {
      width: 128,
      height: 128,
    };

    props.center = center;
    props.brickProps = brickProps;
    props.brickTypes = brickTypes;
    props.paddleProps = paddleProps;
    props.ballProps = ballProps;
    props.lives = 3;
    props.heartProps = heartProps;
    props.hearts = [];
    props.score = 0;

    return props;
  }

  create() {
    this.props = this.initializeProps();

    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.createBricks();
    this.createBall();
    this.createPaddle();
    this.createHearts();
    this.createScoreText();

    this.cursors = this.game.input.keyboard.createCursorKeys();
  }

  update() {
    this.hitBrick = this.game.physics.arcade.collide(this.ball, this.bricks, this.collideWithBrick, null, this);
    this.game.physics.arcade.overlap(this.ball, this.paddle, this.collideWithPaddle, null, this);

    this.paddle.body.velocity.x = this.props.ballProps.initialVelocityX;

    const velocity = this.props.ballProps.initialVelocityY;

    if (this.cursors.left.isDown) {
      this.paddle.body.velocity.x = -velocity;
    } else if (this.cursors.right.isDown) {
      this.paddle.body.velocity.x = velocity;
    }

    if (this.ball.body.blocked.down) {
      this.reset(false);
    }
  }

  collideWithPaddle(ball, paddle) {
    const { paddleProps, ballProps } = this.props;
    const segmentWidth = paddleProps.width / paddleProps.segments;

    let segmentHit = Math.floor((ball.x - paddle.x) / segmentWidth);

    if (segmentHit > paddleProps.segments - 1) {
      segmentHit = paddleProps.segments - 1;
    } else if (segmentHit < 0) {
      segmentHit = 0;
    }

    segmentHit = -(paddleProps.segments / 2) + segmentHit;

    // -90 degrees points up
    // interpolate between -135 degrees and -45 degrees
    const returnAngle = -90 + (segmentHit * paddleProps.segmentAngle);
    this.game.physics.arcade.velocityFromAngle(returnAngle, ballProps.initialVelocityY, this.ball.body.velocity);
  }

  collideWithBrick(ball, brick) {
    this.props.score += 10;
    this.scoreText.text = `Score: ${this.props.score}`;
    brick.kill();
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

  createHearts() {
    this.hearts = this.game.add.group();
    const scaleFactor = this.props.brickProps.width / this.props.heartProps.width;
    let posX = this.game.width - this.props.brickProps.width;

    for (let i = 0; i < this.props.lives; i++) {
      const heart = this.game.add.sprite(posX, 0, 'heart');
      heart.scale.setTo(scaleFactor, scaleFactor);
      this.props.hearts.push(heart);

      posX -= this.props.brickProps.width;
    }
  }

  createScoreText() {
    this.scoreText = this.game.add.bitmapText(0, 0, 'carrier_command', `Score: ${this.props.score}`, 16);
  }

  reset(shouldRestart) {
    // reset ball props
    this.ball.body.x = this.props.ballProps.initialX;
    this.ball.body.y = this.props.ballProps.initialY;
    this.ball.body.velocity.x = this.props.ballProps.initialVelocityX;
    this.ball.body.velocity.y = this.props.ballProps.initialVelocityY;

    // reset paddle props
    this.paddle.body.x = this.props.paddleProps.initialX;
    this.paddle.body.y = this.props.paddleProps.initialY;

    if (shouldRestart) {
      this.props.lives = 3;
      this.createHearts();
    } else {
      // remove a life
      this.props.lives--;
      const heart = this.props.hearts.pop();
      if (heart) {
        heart.kill();
      }

      if (this.props.lives === 0) {
        this.endGame();
      }
    }
  }

  endGame() {
    this.ball.body.velocity.y = 0;
    this.endText = this.game.add.bitmapText(
      this.props.center.x, this.props.center.y, 'carrier_command', 'Game Over', 32
    );
    this.endText.anchor.setTo(0.5, 0.5);
    this.game.input.onDown.addOnce(this.restart, this);
  }

  restart() {
    this.endText.destroy();
    this.reset(true);
  }
}

export default GameState;
