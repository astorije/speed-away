var Point = function() {
  this.x = null;
  this.y = null;
}

Point.prototype.initPoint = function(x, y) {
  this.x = x;
  this.y = y;

  return this;
}