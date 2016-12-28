import Ball from '../objects/ball';
import Paddle from '../objects/paddle';
import Hud from '../objects/hud';
import BrickRow from '../objects/brickRows';

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
      initialVelocityY: 500,
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
    props.destroyed = 0;
    props.brickCount = (this.game.width / brickProps.width) * brickTypes.length;

    return props;
  }

  create() {
    this.props = this.initializeProps();

    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.ball = new Ball({
      game: this.game,
      x: this.props.ballProps.initialX,
      y: this.props.ballProps.initialY,
      asset: 'ball',
      initialVelocityY: this.props.ballProps.initialVelocityY,
    });

    this.paddle = new Paddle({
      game: this.game,
      x: this.props.paddleProps.initialX,
      y: this.props.paddleProps.initialY,
      asset: 'paddle',
    });

    this.hud = new Hud({
      game: this.game,
      font: 'carrier_command',
    });

    this.brickRows = new BrickRow({
      game: this.game,
      brickTypes: this.props.brickTypes,
      brickProps: this.props.brickProps,
    });

    this.game.add.existing(this.ball);
    this.game.add.existing(this.paddle);
    this.game.add.existing(this.hud);
    this.game.add.existing(this.brickRows);

    this.cursors = this.game.input.keyboard.createCursorKeys();

    this.ball.start();
  }

  update() {
    this.game.physics.arcade.collide(this.ball, this.brickRows, this.collideWithBrick, null, this);
    this.game.physics.arcade.overlap(this.ball, this.paddle, this.collideWithPaddle, null, this);

    this.paddle.body.velocity.x = this.props.ballProps.initialVelocityX;

    const velocity = this.props.ballProps.initialVelocityY;

    if (this.cursors.left.isDown) {
      this.paddle.body.velocity.x = -velocity;
    } else if (this.cursors.right.isDown) {
      this.paddle.body.velocity.x = velocity;
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
    this.hud.updateScore();
    brick.kill();
  }
}

export default GameState;
