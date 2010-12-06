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

  this.collidingObjects = null;
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

  this.collidingObjects = new Array();

  return this;
}

GameObject.prototype.canCollideWith = function(object) {
  if(object != this && !this.collidingObjects.contains(object))
    this.collidingObjects.push(object);
}

GameObject.prototype.destroyGameObject = function() {
  GameObjectManager.removeGameObject(this);
}