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
  if(arg0 instanceof Point && arg1 instanceof Point) {
    this.calculatePoints(arg0, arg1);
  }
  else {
    this.topLeft = arg0;
    this.width = arg1;
    this.height = arg2;

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

    this.topBorder = new Segment().initSegment(this.topLeft, this.topRight);
    this.bottomBorder = new Segment().initSegment(this.bottomLeft, this.bottomRight);
    this.leftBorder = new Segment().initSegment(this.topLeft, this.bottomLeft);
    this.rightBorder = new Segment().initSegment(this.topRight, this.bottomRight);
  }

  return this;
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

  this.width = this.topRight.x - this.topLeft.x;
  this.height = this.bottomRight.y - this.bottomLeft.y;

  this.topBorder = new Segment().initSegment(this.topLeft, this.topRight);
  this.bottomBorder = new Segment().initSegment(this.bottomLeft, this.bottomRight);
  this.leftBorder = new Segment().initSegment(this.topLeft, this.bottomLeft);
  this.rightBorder = new Segment().initSegment(this.topRight, this.bottomRight);
}