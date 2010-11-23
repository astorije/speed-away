var LineShapeGameObject = function() {
  this.toX = null;
  this.toY = null;

  this.time = 0;
  this.totalTime = 2;
  this.ratio = 1;
  this.dir = 'down';

  this.boundingBox = null;
}

LineShapeGameObject.prototype = new ShapeGameObject();

LineShapeGameObject.prototype.initLineShapeGameObject = function(x, y, z, lineWidth, strokeStyle, toX, toY) {
  this.initShapeGameObject(x, y, z, lineWidth, strokeStyle);

  this.toX = toX;
  this.toY = toY;

  this.boundingBox = new AARectangle().initAARectangle(
    new Point().initPoint(x, y),
    (toX > x ? toX - x : x - toX) + (x == toX)*(Math.max(0, lineWidth-1)),
    (toY > y ? toY - y : y - toY) + (y == toY)*(Math.max(0, lineWidth-1))
  );

  return this;
}

LineShapeGameObject.prototype.update = function(delay, context, xScroll, yScroll) {
  /*if(this.time < 0) this.dir = 'down';
  else if(this.time > this.totalTime) this.dir = 'up';
  if(this.dir == 'up')
    this.time -= delay;
  else
    this.time += delay;
  this.ratio = Math.min(1, Math.max(0, this.time / this.totalTime));
  */this.ratio = 1;
}

LineShapeGameObject.prototype.draw = function(delay, context, xScroll, yScroll) {
  context.lineWidth = this.lineWidth;
  context.strokeStyle = this.strokeStyle;

  context.beginPath();
  context.moveTo(this.x, this.y);
  context.lineTo(
    this.x + (this.toX - this.x) * this.ratio,
    this.y + (this.toY - this.y) * this.ratio
  );
  context.stroke();
  context.closePath();
}

LineShapeGameObject.prototype.slideUp = function(duration) {

}