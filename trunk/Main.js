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
Starfish.load();

include('app/GameIO.js');
include('app/Ball.js');
include('app/Level.js');
include('app/LevelView.js');
include('app/AbstractItem.js');
include('app/ExitItem.js');
include('app/FasterItem.js');
include('app/MirrorItem.js');
include('app/ItemManager.js');

include('config.js');

/**
 * Intervalle entre 2 images : 1000 / FPS
 * @type Number
 */
var MILLISECONDS_BETWEEN_FRAMES = 1000 / 30;

var img_ball_blue = new Image();
img_ball_blue.src = "img/ball_blue.png";

var img_ball_red = new Image();
img_ball_red.src = "img/ball_red.png";

var img_exit = new Image();
img_exit.src = 'img/exit.png';

var img_mirror = new Image();
img_mirror.src = 'img/mirror.png';

var img_faster = new Image();
img_faster.src = 'img/faster.png';

// Démarrage de l'application
//window.onload = init;

function startGame() {
  var gameObjectManager = new GameObjectManager().initGameObjectManager();

  var player1 = new Ball().initBall(1, 'player1', img_ball_blue, Keyboard.UP, Keyboard.DOWN, Keyboard.LEFT, Keyboard.RIGHT);
  //gameObjectManager.addGameObject(player1);

  var player2 = new Ball().initBall(1, 'player2', img_ball_red, Keyboard.Z, Keyboard.S, Keyboard.Q, Keyboard.D);
  //gameObjectManager.addGameObject(player2);

  var levelView = new LevelView().initLevelView(1, 1, 2);
  //gameObjectManager.addGameObject(levelView);

  levelView.loadObjectAt(player1, 1, 1);
  //levelView.loadObjectAt(player2, 9, 7);
  levelView.loadObjectAt(player2, 18, 0);

  levelView.canCollideWith(player1);
  levelView.canCollideWith(player2);

  player1.canCollideWith(levelView);
  player2.canCollideWith(levelView);
  player2.canCollideWith(player1);
  player1.canCollideWith(player2);

  var itemManager = new ItemManager().initItemManager(levelView, player1, player2);
//  gameObjectManager.addGameObject(itemManager);
 // itemManager.observable.addObserver(gameObjectManager);
  itemManager.canCollideWith(player1);
  itemManager.canCollideWith(player2);

  var exit = new ExitItem().initExitItem();
  levelView.loadObjectAt(exit, 9, 5);
 // gameObjectManager.addGameObject(exit);

  var gameIO = GameIO.getInstance();

  exit.observable.addObserver(gameIO);

  player1.canCollideWith(exit);
  player2.canCollideWith(exit);
}

