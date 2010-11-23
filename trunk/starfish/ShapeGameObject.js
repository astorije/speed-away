var ShapeGameObject = function() {
  this.lineWidth = null;
  this.fillStyle = null;
  this.strokeStyle = null;
}

ShapeGameObject.prototype = new GameObject();

ShapeGameObject.prototype.initShapeGameObject = function(x, y, z, lineWidth, strokeStyle, fillStyle) {
  this.initGameObject(x, y, z);

  this.lineWidth = lineWidth;
  if(fillStyle)
    this.fillStyle = fillStyle;
  if(strokeStyle)
    this.strokeStyle = strokeStyle;
}