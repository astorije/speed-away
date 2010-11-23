/**
 * Objets présents dans le jeu
 * @abstract
 */
var GameObject = function() {
  /**
   * Ordre de profondeur. Plus le chiffre est grand, plus l'objet est éloigné.
   * @type Number
   */
  this.zOrder = 0;

  /**
   * Abscisse de l'objet
   * @type Number
   */
  this.x = 0;

  /**
   * Ordonnée de l'objet
   * @type Number
   */
  this.y = 0;
}

/**
 * Initialise l'objet et l'ajoute au GameObjectManager
 * @param Number x Abscisse de l'objet
 * @param Number y Ordonnée de l'objet
 * @param Number z Profondeur de l'objet
 */
GameObject.prototype.initGameObject = function(x, y, z) {
  this.zOrder = z;
  this.x = x;
  this.y = y;

  gameObjectManager.addGameObject(this);

  return this;
}

GameObject.prototype.destroyGameObject = function() {
  gameObjectManager.removeGameObject(this);
}