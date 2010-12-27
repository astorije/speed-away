/**
 * Gestionnaire de tous les objets du jeu
 * @class
 */
var GameObjectManager = function() {
  /**
   * Liste ordonnée des objets du jeu.
   * @type Array
   */
  this.gameObjects = new Array();

  /**
   * Référence du canvas de la page HTML
   * @type HTMLCanvasElement
   */
  this.canvas = null;

  /**
   * Référence du context2D du canvas
   * @type CanvasRenderingContext2D
   */
  this.context2D = null;

  /**
   * Référence du second canvas stocké en mémoire
   * @type HTMLCanvasElement
   */
  this.backBuffer = null;

  /**
   * Référence du context2D du second canvas
   * @type CanvasRenderingContext2D
   */
  this.backBufferContext2D = null;

  /**
   * Référence de l'instance d'ApplicationManager
   * @type ApplicationManager
   */
  this.applicationManager = null;

  /**
   * Date à laquelle la dernière frame a été affichée
   * @type Date
  */
  this.lastFrameTime = new Date().getTime();

  /**
   * The global scrolling value of the x axis
   * @type Number
   */
  this.xScroll = 0;
  /**
   * The global scrolling value of the y axis
   * @type Number
   */
  this.yScroll = 0;
}

GameObjectManager.instance = null;

GameObjectManager.getInstance = function() {
  if(!GameObjectManager.instance)
    GameObjectManager.instance = new GameObjectManager();
  return GameObjectManager.instance;
}

/**
 * Initialise l'instance de GameObjectManager
 * @return La référence de l'instance
 */
GameObjectManager.prototype.initGameObjectManager = function() {
  GameObjectManager.instance = this;

  // Ajout de gestionnaires d'événements pour le clavier
  document.onkeydown = function(e){GameObjectManager.instance.keyDown(e);};
  document.onkeyup = function(e){GameObjectManager.instance.keyUp(e);};

  // Récupère les références des canvas et des context2D
  this.canvas = document.getElementById('canvas');
  this.context2D = this.canvas.getContext('2d');
  this.backBuffer = document.createElement('canvas');
  this.backBuffer.width = this.canvas.width;
  this.backBuffer.height = this.canvas.height;
  this.backBufferContext2D = this.backBuffer.getContext('2d');

  // lance setInterval() pour dessiner périodiquement le gameObjectManager
  setInterval(function(){GameObjectManager.instance.draw();}, MILLISECONDS_BETWEEN_FRAMES);

  return this;
}

/**
 * Boucle d'affichage
 */
GameObjectManager.prototype.draw = function() {
  // Calcule le temps passé
  var thisFrameTime = new Date().getTime();
  var delay = (thisFrameTime - this.lastFrameTime)/1000;
  this.lastFrameTime = thisFrameTime;

  if(delay >= MILLISECONDS_BETWEEN_FRAMES/1000 * 3)
//    delay = MILLISECONDS_BETWEEN_FRAMES/1000;
    return;

  // Efface les contextes
  this.backBufferContext2D.clearRect(0, 0, this.backBuffer.width, this.backBuffer.height);
  this.context2D.clearRect(0, 0, this.canvas.width, this.canvas.height);

  // Mise à jour de tous les objects du jeu
  for(var i=0; i<this.gameObjects.length; i++)
    if(this.gameObjects[i].update)
      this.gameObjects[i].update(delay, this.backBufferContext2D, this.xScroll, this.yScroll);

  // Affichage de tous les objects du jeu
  for(var i=0; i<this.gameObjects.length; i++)
    if(this.gameObjects[i].draw)
      this.gameObjects[i].draw(delay, this.backBufferContext2D, this.xScroll, this.yScroll);

  this.context2D.drawImage(this.backBuffer, 0, 0);

  // DEBUG
  if(document.getElementById('span_fps'))
    if(typeof this.debugFps == 'undefined' || this.debugFps < 0) {
      document.getElementById('span_fps').innerHTML = Math.round(1 / delay);
      this.debugFps = 0.5;
    }
    else this.debugFps -= delay;
};

GameObjectManager.prototype.addGameObject = function(gameObject) {
  this.gameObjects.push(gameObject);
  this.gameObjects.sort(function(a, b) {return b.zOrder - a.zOrder});
};

GameObjectManager.prototype.removeGameObject = function(gameObject) {
  this.gameObjects.removeObject(gameObject);
};

// http://www.javascriptkit.com/jsref/eventkeyboardmouse.shtml
GameObjectManager.prototype.keyDown = function(event) {
  if(!event) event = window.event; // Widows fix

  // Appel de tous les handlers d'appui sur une touche du clavier
  for(var i=0; i<this.gameObjects.length; i++)
    if(this.gameObjects[i].keyDown)
      this.gameObjects[i].keyDown(event);
}

GameObjectManager.prototype.keyUp = function(event) {
  if(!event) event = window.event; // Widows fix

  // Appel de tous les handlers de relâchement d'une touche du clavier
  for(var i=0; i<this.gameObjects.length; i++)
    if(this.gameObjects[i].keyUp)
      this.gameObjects[i].keyUp(event);
}

GameObjectManager.prototype.observe = function(observable, type, values) {
  //if(observable instanceof GameObject)
    for(var i=0; i<observable.gameObjectsToCreate.length; ++i) {
      this.gameObjects.push(observable.gameObjectsToCreate[i]);
      observable.gameObjectsToCreate.removeObject(observable.gameObjectsToCreate[i]);
    }
}