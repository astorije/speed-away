/**
 * Objets présents dans le jeu et qui doivent être affichés. Hérite de GameObject
 */
function VisualGameObject() {

  /**
   * L'image de l'objet
   * @type Image
   */
  this.image = null;
}

// Héritage
VisualGameObject.prototype = new GameObject();

/**
 * Initialise et retourne l'objet
 * @param Image image
 * @param Number x Abscisse de l'objet
 * @param Number y Ordonnée de l'objet
 * @param Number z Profondeur de l'objet
 * @return VisualGameObject Instance du VisualGameObject initialisé
 */
VisualGameObject.prototype.initVisualGameObject = function(x, y, z, image) {
  this.initGameObject(x, y, z);
  this.image = image;
  return this;
}

/**
 * Dessine l'objet dans le back buffer
 * @param Number delay Temps écoulé depuis la dernière frame
 * @param CanvasRenderingContext2D context
 * @param Number xScroll
 * @param Number yScroll
 */
VisualGameObject.prototype.draw = function(delay, context, xScroll, yScroll) {
  context.drawImage(this.image, this.x - xScroll, this.y - yScroll);
}

VisualGameObject.prototype.destroyVisualGameObject = function() {
  this.boundingBox = null;
  this.destroyGameObject();
}