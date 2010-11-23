function include(fileName){
  document.write("<script type='text/javascript' src='"+fileName+"'></script>");
}

Starfish.enable('GameObject');
Starfish.enable(['Collision', 'Point', 'Circle', 'Segment', 'AARectangle']);
Starfish.enable(['VisualGameObject', 'AnimatedVisualGameObject']);
Starfish.enable(['ShapeGameObject', 'RectangleShapeGameObject', 'LineShapeGameObject']);
Starfish.enable('GameObjectManager');
Starfish.enable('Keyboard');
Starfish.load();

include('Ball.js');
include('Level.js');
include('LevelView.js');
include('ApplicationManager.js');

/**
 * Intervalle entre 2 images : 1000 / FPS
 * @type Number
 */
var MILLISECONDS_BETWEEN_FRAMES = 1000 / 30;
/**
 * Référence à l'instance de GameObjectManager
 * @type GameObjectManager
 */
var gameObjectManager = null;

var img_ball_blue = new Image();
img_ball_blue.src = "ball_blue.png";

var img_ball_red = new Image();
img_ball_red.src = "ball_red.png";

// Démarrage de l'application
window.onload = init;

function init() {
  GameObjectManager.getInstance().initGameObjectManager();
}

