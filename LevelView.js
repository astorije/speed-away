
var LevelView = function() {
  this.squareSize = 34; // px
  this.lineWidth = 2; // px
  this.strokeStyle = '#555';

  this.level = null; // Modèle

  this.verticalWalls = [];
  this.horizontalWalls = [];
}

LevelView.prototype = new GameObject();

LevelView.instance = null;

LevelView.getInstance = function() {
  if(!LevelView.instance)
    LevelView.instance = new LevelView();
  return LevelView.instance;
}

LevelView.prototype.initLevelView = function(x, y, z) {
  this.initGameObject(x, y, z);

  this.level = new Level().initLevel();

 /*new RectangleShapeGameObject().initRectangleShapeGameObject(
    this.x, this.y, this.z,
    this.lineWidth,
    this.strokeStyle,
    null,
    this.level.width * this.squareSize,
    this.level.height * this.squareSize
  );
*/
  for(var j=0; j<this.level.height; j++) {
    this.verticalWalls[j] = [];
    this.horizontalWalls[j] = [];
    for(var i=0; i<this.level.width; i++) {
      if(this.level.hasLeftWall(i, j)) // Lignes verticales
        this.verticalWalls[j][i] = new LineShapeGameObject().initLineShapeGameObject(
          this.x + i*this.squareSize,
          this.y + j*this.squareSize,
          this.z,
          this.lineWidth,
          this.strokeStyle,
          this.x + i*this.squareSize,
          this.y + (j+1)*this.squareSize
        );
      if(this.level.hasTopWall(i, j)) // Lignes horizontales
        this.horizontalWalls[j][i] = new LineShapeGameObject().initLineShapeGameObject(
          this.x + i*this.squareSize,
          this.y + j*this.squareSize,
          this.z,
          this.lineWidth,
          this.strokeStyle,
          this.x + (i+1)*this.squareSize,
          this.y + j*this.squareSize
        );
    }
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

/*
LevelView.prototype.getWalls = function(i, j) {
  walls = new Array();

  if(this.level.hasRightWall(i, j))
    walls.push(this.getRightWall(i, j));

  return walls;
}*/