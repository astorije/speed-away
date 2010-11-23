var RectangleShapeGameObject = function() {
  this.width = null;
  this.height = null;
}

RectangleShapeGameObject.prototype = new ShapeGameObject();

RectangleShapeGameObject.prototype.initRectangleShapeGameObject = function(x, y, z, lineWidth, strokeStyle, fillStyle, width, height) {
  this.initShapeGameObject(x, y, z, lineWidth, strokeStyle, fillStyle);

  this.width = width;
  this.height = height;
}

RectangleShapeGameObject.prototype.draw = function(delay, context, xScroll, yScroll) {
  context.lineWidth = this.lineWidth;

  if(this.fillStyle) {
    context.fillStyle = this.fillStyle;
    context.fillRect(this.x, this.y,  this.width, this.height);
  }

  if(this.strokeStyle) {
    context.strokeStyle = this.strokeStyle;
    context.strokeRect(this.x, this.y,  this.width, this.height);
  }
}