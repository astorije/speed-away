
var Level = function() {
  this.width = 19;
  this.height = 11;

  /**
   * Les murs du labyrinthe, codés sur 2 bits :
   * 0 : pas de mur
   * 1 : mur au-dessus
   * 2 : mur à gauche
   * 3 = 1+2 : mur au-dessus et à gauche
   * @type Array
   */
  this.walls = new Array(
    [3, 1, 3, 1, 1, 3, 1, 3, 1, 1, 3, 3, 1, 3, 1, 1, 3, 3, 2],
    [2, 2, 2, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 1, 2, 2],
    [2, 2, 1, 0, 2, 2, 2, 1, 0, 2, 2, 2, 2, 1, 0, 2, 0, 2, 2],
    [2, 3, 1, 1, 0, 0, 3, 1, 1, 0, 0, 0, 3, 1, 1, 0, 1, 0, 2],
    [2, 1, 1, 1, 3, 0, 1, 1, 1, 3, 0, 1, 1, 1, 3, 0, 3, 0, 2],
    [2, 0, 2, 0, 0, 2, 0, 2, 0, 0, 2, 0, 2, 0, 0, 2, 2, 2, 2],
    [2, 2, 2, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1, 2, 2, 1, 2, 2],
    [2, 2, 1, 0, 2, 2, 2, 1, 0, 2, 2, 2, 2, 1, 0, 2, 0, 3, 2],
    [2, 3, 1, 1, 0, 0, 3, 1, 1, 0, 0, 0, 3, 1, 1, 0, 2, 0, 2],
    [2, 1, 1, 1, 3, 0, 1, 1, 1, 3, 0, 0, 1, 1, 1, 3, 0, 0, 2],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0]
  );
}

Level.currentLevel = null;

Level.prototype.initLevel = function() {
  Level.currentLevel = this;

  return this;
}

Level.getCurrentLevel = function() {
  return Level.currentLevel;
}

Level.prototype.hasLeftWall = function(i, j) {
  if(j < 0) return false;
  return Boolean(this.walls[j][i] & 2);
}

Level.prototype.hasTopWall = function(i, j) {
  if(j < 0) return false;
  return Boolean(this.walls[j][i] & 1);
}

Level.prototype.hasRightWall = function(i, j) {
  if(j < 0) return false;
  return Boolean(this.walls[j][i+1] & 2);
}

Level.prototype.hasBottomWall = function(i, j) {
  if(j < 0) return false;
  return Boolean(this.walls[j+1][i] & 1);
}
