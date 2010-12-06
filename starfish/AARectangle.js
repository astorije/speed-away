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

AARectangle.prototype.initAARectangle = function(arg0, arg1, arg2 /** Optionnel **/) {
  if(arg0 instanceof Point && arg1 instanceof Point)
    this.calculatePoints(arg0, arg1);
  else
    this.calculatePointSizes(arg0, arg1, arg2);

  return this;
}

AARectangle.prototype.setTopLeftPoint = function(p) {
  this.calculatePoints(p, this.bottomRight);
}

AARectangle.prototype.setBottomRightPoint = function(p) {
  this.calculatePoints(this.topLeft, p);
}

AARectangle.prototype.calculatePoints = function (a, b) {
  if(a.x <= b.x && a.y <= b.y) {
    this.topLeft = a;
    this.bottomRight = b;

    this.topRight = new Point().initPoint(
      this.bottomRight.x,
      this.topLeft.y
    );

    this.bottomLeft = new Point().initPoint(
      this.topLeft.x,
      this.bottomRight.y
    );
  }
  else if(a.x > b.x) {
    this.topRight = a;
    this.bottomLeft = b;

    this.topLeft = new Point().initPoint(
      this.bottomLeft.x,
      this.topRight.y
    );

    this.bottomRight = new Point().initPoint(
      this.topRight.x,
      this.bottomLeft.y
    );
  }
  else if(a.x <= b.x && a.y > b.y) {
    this.bottomLeft = a;
    this.topRight = b;

    this.topLeft = new Point().initPoint(
      this.bottomLeft.x,
      this.topRight.y
    );

    this.bottomRight = new Point().initPoint(
      this.topRight.x,
      this.bottomLeft.y
    );
  }
  else {
    this.bottomRight = a;
    this.topLeft = b;

    this.topRight = new Point().initPoint(
      this.bottomRight.x,
      this.topLeft.y
    );

    this.bottomLeft = new Point().initPoint(
      this.topLeft.x,
      this.bottomRight.y
    );
  }

  this.calculateBorders();

  this.width = this.topRight.x - this.topLeft.x;
  this.height = this.bottomRight.y - this.bottomLeft.y;
}

AARectangle.prototype.calculatePointSizes = function(a, width, height) {
    this.topLeft = a;
    this.width = width;
    this.height = height;

    this.bottomRight = new Point().initPoint(
      this.topLeft.x + this.width,
      this.topLeft.y + this.height
    );

    this.topRight = new Point().initPoint(
      this.topLeft.x + this.width,
      this.topLeft.y
    );

    this.bottomLeft = new Point().initPoint(
      this.topLeft.x,
      this.topLeft.y + this.height
    );

    this.calculateBorders();
}

AARectangle.prototype.calculateBorders = function() {
  this.topBorder = new Segment().initSegment(this.topLeft, this.topRight);
  this.bottomBorder = new Segment().initSegment(this.bottomLeft, this.bottomRight);
  this.leftBorder = new Segment().initSegment(this.topLeft, this.bottomLeft);
  this.rightBorder = new Segment().initSegment(this.topRight, this.bottomRight);
}