/**
 * Objets présents dans le jeu et qui doivent être affichés. Hérite de GameObject
 */
function VisualGameObject() {
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

// Héritage
VisualGameObject.prototype = new GameObject();

/**
 * Initialise et retourne l'objet
 * @param Number x Abscisse de l'objet
 * @param Number y Ordonnée de l'objet
 * @param Number z Profondeur de l'objet
 * @return VisualGameObject Instance du VisualGameObject initialisé
 */
VisualGameObject.prototype.initVisualGameObject = function(x, y, z) {
  this.initGameObject();

  this.zOrder = z;
  this.x = x;
  this.y = y;

  return this;
}

VisualGameObject.prototype.destroyVisualGameObject = function() {
  this.boundingBox = null;
  this.destroyGameObject();
}

VisualGameObject.prototype.getX = function() {
  if(this.parent)
    return this.x + this.parent.getX();
  else return this.x;
}

VisualGameObject.prototype.getY = function() {
  if(this.parent)
    return this.y + this.parent.getY();
  else return this.y;
}