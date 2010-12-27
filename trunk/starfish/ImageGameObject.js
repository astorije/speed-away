/**
 * Objets présents dans le jeu et qui doivent être affichés. Hérite de GameObject
 */
function ImageGameObject() {
  /**
   * L'image de l'objet
   * @type Image
   */
  this.image = null;
}

// Héritage
ImageGameObject.prototype = new VisualGameObject();

/**
 * Initialise et retourne l'objet
 * @param Image image
 * @param Number x Abscisse de l'objet
 * @param Number y Ordonnée de l'objet
 * @param Number z Profondeur de l'objet
 * @return VisualGameObject Instance du VisualGameObject initialisé
 */
ImageGameObject.prototype.initImageGameObject = function(x, y, z, image) {
  this.initVisualGameObject(x, y, z);

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
ImageGameObject.prototype.draw = function(delay, context, xScroll, yScroll) {
  context.drawImage(this.image, this.getX() - xScroll, this.getY() - yScroll);
}