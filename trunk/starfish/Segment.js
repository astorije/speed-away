var Segment = function() {
  this.a = null;
  this.b = null;

  this.x = null;
  this.y = null;
}

Segment.prototype.initSegment = function(a, b) {
  this.a = a;
  this.b = b;

  this.x = this.b.x - this.a.x;
  this.y = this.b.y - this.a.y;

  return this;
}