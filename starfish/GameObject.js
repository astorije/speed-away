/**
 * Objets présents dans le jeu
 * @abstract
 */
var GameObject = function() {

  this.collidingObjects = null;

  //this.children = null;
  this.parent = null;
}

/**
 * Initialise l'objet et l'ajoute au GameObjectManager
 * @param Number x Abscisse de l'objet
 * @param Number y Ordonnée de l'objet
 * @param Number z Profondeur de l'objet
 */
GameObject.prototype.initGameObject = function() {

  this.collidingObjects = new Array();
  //this.children = new Array();

  GameObjectManager.instance.addGameObject(this);

  return this;
}

GameObject.prototype.canCollideWith = function(object) {
  if(object != this && !this.collidingObjects.contains(object))
    this.collidingObjects.push(object);
}

GameObject.prototype.destroyGameObject = function() {
  GameObjectManager.instance.removeGameObject(this);
}

GameObject.prototype.setParent = function(object) {
  this.parent = object;
  return this;
}