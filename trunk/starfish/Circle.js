var Circle = function() {
  this.center = null;
  this.radius = null;
}

Circle.prototype.initCircle = function(center, radius) {
  this.center = center;
  this.radius = radius;

  return this;
}