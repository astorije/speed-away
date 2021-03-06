function include(fileName){
  document.write("<script type='text/javascript' src='"+fileName+"'></script>");
}

Starfish.enable('Utils');
Starfish.enable('GameObject');
Starfish.enable(['Collision', 'Point', 'Circle', 'Segment', 'AARectangle']);
Starfish.enable(['VisualGameObject', 'ImageGameObject', 'AnimatedVisualGameObject']);
Starfish.enable(['ShapeGameObject', 'RectangleShapeGameObject', 'LineShapeGameObject']);
Starfish.enable('GameObjectManager');
Starfish.enable('Keyboard');
Starfish.enable('Observable');
Starfish.enable('SoundManager');
Starfish.load();

include('app/Config.js');
include('app/Levels.js');

include('app/GameIO.js');
include('app/Ball.js');
include('app/Level.js');
include('app/LevelView.js');
include('app/AbstractItem.js');
include('app/ExitItem.js');
include('app/FasterItem.js');
include('app/SlowerItem.js');
include('app/MirrorItem.js');
include('app/SwitchItem.js');
include('app/PowerItem.js');
include('app/ItemManager.js');

/**
 * Intervalle entre 2 images : 1000 / FPS
 * @type Number
 */
var MILLISECONDS_BETWEEN_FRAMES = 1000 / 30;

var img_ball_blue = new Image();
img_ball_blue.src = "img/ball_blue.png";

var img_ball_red = new Image();
img_ball_red.src = "img/ball_red.png";

var img_big_ball_blue = new Image();
img_big_ball_blue.src = "img/big_ball_blue.png";

var img_big_ball_red = new Image();
img_big_ball_red.src = "img/big_ball_red.png";

var img_exit = new Image();
img_exit.src = 'img/exit.png';

var img_mirror = new Image();
img_mirror.src = 'img/mirror.png';

var img_switch = new Image();
img_switch.src = 'img/switch.png';

var img_faster = new Image();
img_faster.src = 'img/faster.png';

var img_slower = new Image();
img_slower.src = 'img/slower.png';

var img_power = new Image();
img_power.src = 'img/power.png';

// Démarrage de l'application
//window.onload = init;

function startGame() {
  var soundManager = new SoundManager().initSoundManager();

  var gameObjectManager = new GameObjectManager().initGameObjectManager();

  var player1 = new Ball().initBall(1, 'player1', img_ball_blue, Keyboard.Z, Keyboard.S, Keyboard.Q, Keyboard.D);
  player1.observable.addObserver(soundManager);

  var player2 = new Ball().initBall(1, 'player2', img_ball_red, Keyboard.UP, Keyboard.DOWN, Keyboard.LEFT, Keyboard.RIGHT);
  player2.observable.addObserver(soundManager);

  var levelView = new LevelView().initLevelView(1, 1, 2);

  levelView.loadObjectAt(
    player1,
    levelView.level.origins.player1.x,
    levelView.level.origins.player1.y
  );
  levelView.loadObjectAt(
    player2,
    levelView.level.origins.player2.x,
    levelView.level.origins.player2.y
  );

  levelView.canCollideWith(player1);
  levelView.canCollideWith(player2);

  player1.canCollideWith(levelView);
  player2.canCollideWith(levelView);
  player2.canCollideWith(player1);
  player1.canCollideWith(player2);

  var itemManager = new ItemManager().initItemManager(levelView, player1, player2);
  itemManager.canCollideWith(player1);
  itemManager.canCollideWith(player2);

  var exit = new ExitItem().initExitItem();
  levelView.loadObjectAt(
    exit,
    levelView.level.origins.exit.x,
    levelView.level.origins.exit.y
  );

  var gameIO = GameIO.getInstance();

  exit.observable.addObserver(gameIO);

  player1.canCollideWith(exit);
  player2.canCollideWith(exit);

  soundManager.playSound('music', 0.2);
  soundManager.setLoop('music');
  soundManager.playSoundWhenObserve('ball_wall', 'wallCollided');
  soundManager.playSoundWhenObserve('ball_ball', 'ballCollided');
}

