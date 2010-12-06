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
    new Point().initPoint(this.x, this.y),
    new Point().initPoint(this.toX, this.toY)
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
    this.x + (this.toX - this.x)*this.slidingRatio + (this.x == this.toX)*(Math.max(0, this.lineWidth-1)),
    this.y + (this.toY - this.y)*this.slidingRatio + (this.y == this.toY)*(Math.max(0, this.lineWidth-1))
  ));
}

LineShapeGameObject.prototype.draw = function(delay, context, xScroll, yScroll) {
  context.lineWidth = this.lineWidth;
  context.strokeStyle = this.strokeStyle;

  context.beginPath();
  context.moveTo(this.x, this.y);
  context.lineTo(
    this.x + (this.toX - this.x) * this.slidingRatio,
    this.y + (this.toY - this.y) * this.slidingRatio
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