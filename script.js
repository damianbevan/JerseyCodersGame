// https://codepen.io/leomeloxp/pen/wpmpvy

let player;
let pipes;
let cursors;
let score = 0;
let scoreText;

function restartGame() {
  // Start the 'main' state which restarts the game
  game.state.start('stageOne');
}

/**
 * Create phase functions
 */

function createStageBase() {
  //  A simple background for our game
  game.physics.startSystem(Phaser.Physics.ARCADE);

  game.world.setBounds(0, 0, 2000, 720);

  game.add.tileSprite(0, 120, 2000, 720, 'sky');
}

function createStageOnePlatforms() {
  platforms = game.add.group();
  platforms.enableBody = true;

  let ground = platforms.create(0, game.world.height - 64, 'ground');
  ground.scale.setTo(2, 2);
  ground.body.immovable = true;

  let ground2 = platforms.create(0, game.world.height - 64, 'ground');
  ground.scale.setTo(2, 2);
  ground.body.immovable = true;

  let ledge;
  ledge = platforms.create(400, game.world.height - 400, 'ground');
  ledge.body.immovable = true;

  let ledge2;
  ledge2 = platforms.create(-150, game.world.height - 250, 'ground');
  ledge2.body.immovable = true;
}

function createPlayer() {
  player = game.add.sprite(32, game.world.height - 150, 'venus');
  game.physics.arcade.enable(player);

  player.body.gravity.y = 750;
  player.body.bounce.y = 0.0;
  player.body.collideWorldBounds = true;

  player.animations.add('left', [3, 4, 5], 12, true);
  player.animations.add('right', [0, 1, 2], 12, true);

  game.camera.target = player;
  cursors = game.input.keyboard.createCursorKeys();
}

function createGameHUD() {
  /**
   * The score
   *
   * For more information about text options see:{@link https://photonstorm.github.io/phaser-ce/Phaser.Text.html}
   */
  scoreText = game.add.text(16, 16, 'score: 0', {
    fontSize: '32px',
    fontWeight: '300',
    fill: '#333333'
  });
}

/**
 * Update phase functions
 */

function updateCollisions() {
  //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
  game.physics.arcade.collide(player, platforms);
}

function updatePlayerMovement() {
  if (cursors.left.isDown) {
    player.body.velocity.x = -150;
    player.animations.play('left');
  } else if (cursors.right.isDown) {
    player.body.velocity.x = 150;
    player.animations.play('right');
  } else {
    player.frame = 0;
    player.body.velocity.x = 0;
  }

  if (cursors.up.isDown && player.body.touching.down) {
    player.body.velocity.y = -350;
  }
}

let game = new Phaser.Game(1280, 720);
let stageOne = {
  preload: function() {
    /**
     * Cross Origin is a requirement if you are loading assets from a different domain
     * or using an online editor like codepen
     */
    game.load.crossOrigin = 'anonymous';

    game.load.image(
      'sky',
      'https://rawgit.com/leomeloxp/JerseyCodersGame/master/assets/sky.png'
    );
    game.load.image(
      'ground',
      'https://rawgit.com/leomeloxp/JerseyCodersGame/master/assets/platform.png'
    );
    game.load.spritesheet(
      'venus',
      'https://rawgit.com/leomeloxp/JerseyCodersGame/master/assets/venus.png',
      64,
      64
    );
  },
  create: function() {
    // Create function code
    createStageBase();
    createStageOnePlatforms();
    createPlayer();
  },
  update: function() {
    // Update function code
    updateCollisions();
    updatePlayerMovement();
  },
  render: function() {
    // Render function code
  }
};

game.state.add('stageOne', stageOne);
game.state.start('stageOne');
