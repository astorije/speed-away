var AARectangle = function() {
  this.topLeft = null;
  this.width = null;
  this.height = null;

  this.topRight = null;
  this.bottomLeft = null;
  this.bottomRight = null;

  this.topBorder = null;
  this.bottomBorder = null;
  this.leftBorder = null;
  this.rightBorder = null;
}

AARectangle.prototype.initAARectangle = function(topLeft, width, height) {
  this.topLeft = topLeft;
  this.width = width;
  this.height = height;

  this.topRight = new Point().initPoint(
    this.topLeft.x + this.width,
    this.topLeft.y
  );

  this.bottomLeft = new Point().initPoint(
    this.topLeft.x,
    this.topLeft.y + this.height
  );

  this.bottomRight = new Point().initPoint(
    this.topLeft.x + this.width,
    this.topLeft.y + this.height
  );

  this.topBorder = new Segment().initSegment(this.topLeft, this.topRight);
  this.bottomBorder = new Segment().initSegment(this.bottomLeft, this.bottomRight);
  this.leftBorder = new Segment().initSegment(this.topLeft, this.bottomLeft);
  this.rightBorder = new Segment().initSegment(this.topRight, this.bottomRight);

  return this;
}