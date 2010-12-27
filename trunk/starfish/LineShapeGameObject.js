var LineShapeGameObject = function() {
  this.toX = null;
  this.toY = null;

  this.slidingDuration = null;
  this.slidingRatio = 1;
  this.slidingOff = false;
  this.slidingOn = false;

  this.boundingBox = null;
}

LineShapeGameObject.prototype = new ShapeGameObject();

LineShapeGameObject.prototype.initLineShapeGameObject = function(x, y, z, lineWidth, strokeStyle, toX, toY) {
  this.initShapeGameObject(x, y, z, lineWidth, strokeStyle);

  this.toX = toX;
  this.toY = toY;

  this.boundingBox = new AARectangle().initAARectangle(
    new Point().initPoint(this.getX(), this.getY()),
    new Point().initPoint(
      this.getX() + this.toX + (this.toX == 0)*(Math.max(0, this.lineWidth-1)),
      this.getY() + this.toY + (this.toY == 0)*(Math.max(0, this.lineWidth-1)))
  );

  //this.updateBoudingBox();

  return this;
}

LineShapeGameObject.prototype.update = function(delay, context, xScroll, yScroll) {
  if(this.slidingOff) {
    this.slidingRatio -= delay / this.slidingDuration;
    if(this.slidingRatio <= 0) {
      this.slidingRatio = 0;
      this.slidingOff = false;
    }
    this.updateBoudingBox();
  }
  else if(this.slidingOn) {
    this.slidingRatio += delay / this.slidingDuration;
    if(this.slidingRatio >= 1) {
      this.slidingRatio = 1;
      this.slidingOn = false;
    }
    this.updateBoudingBox();
  }
}

LineShapeGameObject.prototype.updateBoudingBox = function() {
  this.boundingBox.setBottomRightPoint(new Point().initPoint(
    this.getX() + this.toX * this.slidingRatio + (this.toX == 0)*(Math.max(0, this.lineWidth-1)),
    this.getY() + this.toY * this.slidingRatio + (this.toY == 0)*(Math.max(0, this.lineWidth-1))
  ));
}

LineShapeGameObject.prototype.draw = function(delay, context, xScroll, yScroll) {
  context.lineWidth = this.lineWidth;
  context.strokeStyle = this.strokeStyle;

  context.beginPath();
  context.moveTo(this.getX(), this.getY());
  context.lineTo(
    this.getX() + this.toX * this.slidingRatio,
    this.getY() + this.toY * this.slidingRatio
  );
  context.stroke();
  context.closePath();
}

LineShapeGameObject.prototype.slideOn = function(duration) {
  this.slidingDuration = duration;
  this.slidingOn = true;
  this.slidingOff = false;
}

LineShapeGameObject.prototype.slideOff = function(duration) {
  this.slidingDuration = duration;
  this.slidingOn = false;
  this.slidingOff = true;
}

LineShapeGameObject.prototype.show = function() {
  this.slidingRatio = 1;
  this.updateBoudingBox();
}

LineShapeGameObject.prototype.hide = function() {
  this.slidingRatio = 0;
  this.updateBoudingBox();
}