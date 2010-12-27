
var LevelView = function() {
  this.squareSize = 34; // px
  this.lineWidth = 2; // px
  this.strokeStyle = '#020';

  this.level = null; // Modèle

  this.timeBetweenWallChanging = 3; // secondes
  this.timeSinceLastWallChanging = 0;

  this.verticalWalls = [];
  this.horizontalWalls = [];

  this.obstacles = null;
}

LevelView.prototype = new VisualGameObject();

LevelView.prototype.initLevelView = function(x, y, z) {
  this.initVisualGameObject(x, y, z);

  this.obstacles = new Array();

  this.level = new Level().initLevel();
  this.level.addObserver(this);

  this.verticalWalls = [];
  this.horizontalWalls = [];

  for(var j=0; j<this.level.height; j++) {
    this.verticalWalls[j] = [];
    this.horizontalWalls[j] = [];
    for(var i=0; i<this.level.width; i++) {
      this.verticalWalls[j][i] = new LineShapeGameObject().setParent(this).initLineShapeGameObject(
        i*this.squareSize,
        j*this.squareSize,
        this.zOrder,
        this.lineWidth,
        this.strokeStyle,
        0,
        this.squareSize
      );
      //this.verticalWalls[j][i].setParent(this);

      if(this.level.hasLeftWall(i, j)) { // Lignes verticales
        if(i == 0 || i == this.level.width - 1)
          this.verticalWalls[j][i].strokeStyle = 'transparent';
        else if(this.level.isLeftStateFixed(i, j))
          this.verticalWalls[j][i].strokeStyle = '#FFF';
        this.verticalWalls[j][i].show();
      }
      else
        this.verticalWalls[j][i].hide();

      this.horizontalWalls[j][i] = new LineShapeGameObject().setParent(this).initLineShapeGameObject(
        i*this.squareSize,
        j*this.squareSize,
        this.zOrder,
        this.lineWidth,
        this.strokeStyle,
        this.squareSize,
        0
      );
      //this.horizontalWalls[j][i].setParent(this);

      if(this.level.hasTopWall(i, j)) { // Lignes horizontales
        if(j == 0 || j == this.level.height - 1)
          this.horizontalWalls[j][i].strokeStyle = 'transparent';
        else if(this.level.isTopStateFixed(i, j))
          this.horizontalWalls[j][i].strokeStyle = '#FFF';
        this.horizontalWalls[j][i].show();
      }
      else
        this.horizontalWalls[j][i].hide();
    }
  }

  return this;
}

LevelView.prototype.update = function(delay, context, xScroll, yScroll) {
  this.timeSinceLastWallChanging += delay;
  if(this.timeSinceLastWallChanging >= this.timeBetweenWallChanging) {
    this.timeSinceLastWallChanging -= this.timeBetweenWallChanging;

    var i, j, horizontal;

    do {
      horizontal = Math.intRandomBetween(0, 1);
      i = Math.intRandomBetween(0, this.level.width - 1);
      j = Math.intRandomBetween(0, this.level.height - 1);
    } while(
      horizontal && !this.level.removeTopWall(i, j)
      || !horizontal && !this.level.removeLeftWall(i, j)
    );

    do {
      horizontal = Math.intRandomBetween(0, 1);
      i = Math.intRandomBetween(0, this.level.width - 1);
      j = Math.intRandomBetween(0, this.level.height - 1);
    } while(!this.obstacleAt(i, j) && (
      horizontal && !this.level.addTopWall(i, j)
      || !horizontal && !this.level.addLeftWall(i, j)
    ));
  }

  for(var j=0; j<this.level.height; j++)
    for(var i=0; i<this.level.width; i++) {
      if(this.horizontalWalls[j][i].slidingRatio == 1
      && this.horizontalWalls[j][i].strokeStyle == '#0F0')
        this.horizontalWalls[j][i].strokeStyle = this.strokeStyle;

      if(this.verticalWalls[j][i].slidingRatio == 1
      && this.verticalWalls[j][i].strokeStyle == '#0F0')
        this.verticalWalls[j][i].strokeStyle = this.strokeStyle;
    }
}

LevelView.prototype.getLevelColumn = function(x) {
  return Math.floor((x - this.getX()) / this.squareSize);
}

LevelView.prototype.getLevelRow = function(y) {
  return Math.floor((y - this.getY()) / this.squareSize);
}

LevelView.prototype.getTopWall = function(i, j) {
  return this.horizontalWalls[j][i];
}

LevelView.prototype.getLeftWall = function(i, j) {
  return this.verticalWalls[j][i];
}

LevelView.prototype.getRightWall = function(i, j) {
  return this.verticalWalls[j][i+1];
}

LevelView.prototype.getBottomWall = function(i, j) {
  return this.horizontalWalls[j+1][i];
}

LevelView.prototype.observe = function(observable, type, values) {
  if(observable instanceof Level) {
    if(type == 'addedLeftWall') {
      this.verticalWalls[values.j][values.i].strokeStyle = '#0F0';
      this.verticalWalls[values.j][values.i].slideOn(1.5);
    }
    else if(type == 'removedLeftWall') {
      this.verticalWalls[values.j][values.i].strokeStyle = '#F00';
      this.verticalWalls[values.j][values.i].slideOff(1.5);
    }

    else if(type == 'addedTopWall') {
      this.horizontalWalls[values.j][values.i].strokeStyle = '#0F0';
      this.horizontalWalls[values.j][values.i].slideOn(1.5);
    }
    else if(type == 'removedTopWall') {
      this.horizontalWalls[values.j][values.i].strokeStyle = '#F00';
      this.horizontalWalls[values.j][values.i].slideOff(1.5);
    }
  }
}

LevelView.prototype.obstacleAt = function(i, j) {
  for(var k=0; k<this.collidingObjects.length; ++k)
    if(this.collidingObjects[k] instanceof Ball) {
      var cases = this.collidingObjects[k].getCasesUnder(this);
      for(var l=0; l<cases.length; ++l)
        if(cases[l][0] == i && cases[l][1] == j)
          return true;
    }
  return false;
}

LevelView.prototype.loadObjectAt = function(object, i, j) {
  if(this.obstacleAt(i, j))
    return false;
  if(object instanceof AnimatedVisualGameObject)
    object.x = this.getX() + (i+0.5)*this.squareSize - object.frameWidth/2;
  else
    object.x = this.getX() + (i+0.5)*this.squareSize - object.image.width/2;
  object.y = this.getY() + (j+0.5)*this.squareSize - object.image.height/2;
  object.updateBoundingBox();
}