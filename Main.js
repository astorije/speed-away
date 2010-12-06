function include(fileName){
  document.write("<script type='text/javascript' src='"+fileName+"'></script>");
}

Starfish.enable('Utils');
Starfish.enable('GameObject');
Starfish.enable(['Collision', 'Point', 'Circle', 'Segment', 'AARectangle']);
Starfish.enable(['VisualGameObject', 'AnimatedVisualGameObject']);
Starfish.enable(['ShapeGameObject', 'RectangleShapeGameObject', 'LineShapeGameObject']);
Starfish.enable('GameObjectManager');
Starfish.enable('Keyboard');
Starfish.enable('Observable');
Starfish.load();

include('app/Ball.js');
include('app/Level.js');
include('app/LevelView.js');
include('app/ExitItem.js');
include('app/MirrorItem.js');
include('app/ItemManager.js');
include('app/ApplicationManager.js');

/**
 * Intervalle entre 2 images : 1000 / FPS
 * @type Number
 */
var MILLISECONDS_BETWEEN_FRAMES = 1000 / 50;

var img_ball_blue = new Image();
img_ball_blue.src = "img/ball_blue.png";

var img_ball_red = new Image();
img_ball_red.src = "img/ball_red.png";

// Démarrage de l'application
window.onload = init;

function init() {
  var gameObjectManager = new GameObjectManager().initGameObjectManager();

  var player1 = new Ball().initBall(17, 17, 1, img_ball_blue, Keyboard.UP, Keyboard.DOWN, Keyboard.LEFT, Keyboard.RIGHT);
  gameObjectManager.addGameObject(player1);

  var player2 = new Ball().initBall(100, 85, 1, img_ball_red, Keyboard.Z, Keyboard.S, Keyboard.Q, Keyboard.D);
  gameObjectManager.addGameObject(player2);

  var levelView = new LevelView().initLevelView(14, 14, 2);
  gameObjectManager.addGameObject(levelView);

  levelView.canCollideWith(player1);
  levelView.canCollideWith(player2);

  player1.canCollideWith(levelView);
  player2.canCollideWith(levelView);
  player2.canCollideWith(player1);
  player1.canCollideWith(player2);

  new ItemManager().initItemManager();

  var exit = new ExitItem().initExitItem();
  levelView.placeItem(exit, 9, 5);
  gameObjectManager.addGameObject(exit);

  player1.canCollideWith(exit);
  player2.canCollideWith(exit);
}

