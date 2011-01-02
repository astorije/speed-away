/**
 * Afiche un VisualGameObject animé
 */
function AnimatedVisualGameObject() {
  /**
   * Définit la frame courante à afficher
   * @type Number
   */
  this.currentFrame = 0;

  /**
   * Le délai entre chaque frame de l'image
   * @type Number
   */
  this.fps = 0;

  /**
   * Temps restant avant la prochaine frame
   * @type Number
   */
  this.timeBeforeNextFrame = 0;

  /**
   * Largeur de chaque frame
   * @type Number
   */
  this.frameWidth = 0;

  /**
   * Nombre total de frames
   * @return Number;
   */
  this.frameCount = 0;

  this.boundingBox = null;
  this.hidden = false;
}

AnimatedVisualGameObject.prototype = new ImageGameObject;

/**
 * Initialise et retourne l'objet
 * @param Image image
 * @param Number x Abscisse de l'objet
 * @param Number y Ordonnée de l'objet
 * @param Number z Profondeur de l'objet
 * @param Number frameCount Nombre total d'image
 * @param Number fps Nombre de frames par seconde
 * @return VisualGameObject Instance du VisualGameObject initialisé
 */
AnimatedVisualGameObject.prototype.initAnimatedVisualGameObject = function(x, y, z, image, frameCount, fps) {
  if (frameCount <= 0) throw "framecount can not be <= 0";
  if (fps <= 0) throw "fps can not be <= 0"

  this.initImageGameObject(x, y, z, image);

  this.currentFrame = 0;
  this.fps = fps;
  this.timeBeforeNextFrame = this.timeBetweenFrames();
  this.frameWidth = this.image.width / frameCount;
  this.frameCount = frameCount;

  this.boundingBox = new AARectangle().initAARectangle(new Point().initPoint(this.x, this.y), this.frameWidth, this.image.height);

  return this;
}

AnimatedVisualGameObject.prototype.updateBoundingBox = function() {
  this.boundingBox.calculatePointSizes(new Point().initPoint(this.x, this.y), this.frameWidth, this.image.height);
}

AnimatedVisualGameObject.prototype.setAnimation = function(image, frameCount, fps) {
  if (frameCount <= 0) throw "framecount can not be <= 0";
  if (fps <= 0) throw "fps can not be <= 0"

  this.image = image;
  this.currentFrame = 0;
  this.fps = fps;
  this.timeBeforeNextFrame = this.timeBetweenFrames();
  this.frameWidth = this.image.width / frameCount;
  this.frameCount = frameCount;
}


AnimatedVisualGameObject.prototype.timeBetweenFrames = function() {
  return 1 / this.fps;
}

/**
 * Affiche l'élément dans le back buffer
 * @param Number delay Temps écoulé depuis la dernière frame
 * @param CanvasRenderingContext2D context
 * @param Number xScroll
 * @param Number yScroll
 */
AnimatedVisualGameObject.prototype.draw = function(delay, context, xScroll, yScroll) {
  if(this.hidden)
    return;

  var sourceX = this.currentFrame * this.frameWidth;

  context.drawImage(this.image, sourceX, 0, this.frameWidth, this.image.height, this.x - xScroll, this.y - yScroll, this.frameWidth, this.image.height);

  this.timeBeforeNextFrame -= delay;
  if(this.timeBeforeNextFrame <= 0) {
    this.timeBeforeNextFrame = this.timeBetweenFrames();
    ++this.currentFrame;
    this.currentFrame %= this.frameCount;
  }
}

AnimatedVisualGameObject.prototype.hide = function() {
  this.hidden = true;
  this.boundingBox = null;
}