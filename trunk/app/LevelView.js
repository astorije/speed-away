
var LevelView = function() {
  this.squareSize = 34; // px
  this.lineWidth = 2; // px
  this.strokeStyle = '#555';

  this.level = null; // Modèle

  this.timeBetweenWallChanging = 3; // secondes
  this.timeSinceLastWallChanging = 0;

  this.verticalWalls = [];
  this.horizontalWalls = [];

  this.obstacles = null;
}

LevelView.prototype = new GameObject();

LevelView.prototype.initLevelView = function(x, y, z) {
  this.initGameObject(x, y, z);

  this.obstacles = [];

  this.level = new Level().initLevel();
  this.level.addObserver(this);

 /*new RectangleShapeGameObject().initRectangleShapeGameObject(
    this.x, this.y, this.z,
    this.lineWidth,
    this.strokeStyle,
    null,
    this.level.width * this.squareSize,
    this.level.height * this.squareSize
  );
*/

  this.verticalWalls = [];
  this.horizontalWalls = [];

  for(var j=0; j<this.level.height; j++) {
    this.verticalWalls[j] = [];
    this.horizontalWalls[j] = [];
    for(var i=0; i<this.level.width; i++) {
      this.verticalWalls[j][i] = new LineShapeGameObject().initLineShapeGameObject(
        this.x + i*this.squareSize,
        this.y + j*this.squareSize,
        this.zOrder,
        this.lineWidth,
        this.strokeStyle,
        this.x + i*this.squareSize,
        this.y + (j+1)*this.squareSize
      );

      if(this.level.hasLeftWall(i, j)) { // Lignes verticales
        if(this.level.isLeftStateFixed(i, j))
          this.verticalWalls[j][i].strokeStyle = '#00F';
        this.verticalWalls[j][i].show();
      }
      else
        this.verticalWalls[j][i].hide();

      this.horizontalWalls[j][i] = new LineShapeGameObject().initLineShapeGameObject(
        this.x + i*this.squareSize,
        this.y + j*this.squareSize,
        this.zOrder,
        this.lineWidth,
        this.strokeStyle,
        this.x + (i+1)*this.squareSize,
        this.y + j*this.squareSize
      );

      if(this.level.hasTopWall(i, j)) { // Lignes horizontales
        if(this.level.isTopStateFixed(i, j))
          this.horizontalWalls[j][i].strokeStyle = '#00F';
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
      this.horizontalWalls[j][i].update(delay, context, xScroll, yScroll);
      this.verticalWalls[j][i].update(delay, context, xScroll, yScroll);

      if(this.horizontalWalls[j][i].slidingRatio == 1
      && this.horizontalWalls[j][i].strokeStyle == '#0F0')
        this.horizontalWalls[j][i].strokeStyle = this.strokeStyle;

      if(this.verticalWalls[j][i].slidingRatio == 1
      && this.verticalWalls[j][i].strokeStyle == '#0F0')
        this.verticalWalls[j][i].strokeStyle = this.strokeStyle;
    }
}

LevelView.prototype.draw = function(delay, context, xScroll, yScroll) {
  for(var j=0; j<this.level.height; j++)
    for(var i=0; i<this.level.width; i++) {
      if(this.horizontalWalls[j][i] instanceof LineShapeGameObject)
        this.horizontalWalls[j][i].draw(delay, context, xScroll, yScroll);
      if(this.verticalWalls[j][i] instanceof LineShapeGameObject)
        this.verticalWalls[j][i].draw(delay, context, xScroll, yScroll);
    }
}

LevelView.prototype.getLevelColumn = function(x) {
  return Math.floor((x - this.x) / this.squareSize);
}

LevelView.prototype.getLevelRow = function(y) {
  return Math.floor((y - this.y) / this.squareSize);
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

LevelView.prototype.placeItem = function(item, i, j) {
  item.x = this.x + (i+0.5)*this.squareSize - item.frameWidth/2;
  item.y = this.y + (j+0.5)*this.squareSize - item.image.height/2;
  item.updateBoundingBox();
}