/**
 * Gère l'application complète
 */
var ApplicationManager = function() {}

/**
 * Initialise l'objet
 * @return ApplicationManager Instance de l'ApplicationManager initialisée
 */
ApplicationManager.prototype.initApplicationManager = function() {
  this.player1 = new Ball().initBall(17, 17, 1, img_ball_blue, Keyboard.UP, Keyboard.DOWN, Keyboard.LEFT, Keyboard.RIGHT);
  //this.player2 = new Ball().initBall(100, 100, 1, img_ball_red, Keyboard.Z, Keyboard.S, Keyboard.Q, Keyboard.D);
  this.level = LevelView.getInstance().initLevelView(14, 14, 2);

  return this;
}