
var Level = function() {
  this.width = 19;
  this.height = 11;

  this.timeBetweenWallChanging = 2; // secondes
  this.timeSinceLastWallChanging = 0;

  this.observable = new Observable();

  /**
   * Les murs du labyrinthe, codés sur 2 bits :
   * 0 : pas de mur
   * 1 : mur au-dessus
   * 2 : mur à gauche
   * 3 = 1+2 : mur au-dessus et à gauche
   * @type Array
   */
/*  this.walls = new Array(
    [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0]
  );
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
  this.observable = new Observable(this);

  return this;
}

Level.getCurrentLevel = function() {
  return Level.currentLevel;
}

Level.prototype.hasLeftWall = function(i, j) {
  if(j < 0 || j >= this.width) return false;
  return Boolean(this.walls[j][i] & 2);
}

Level.prototype.hasTopWall = function(i, j) {
  if(j < 0 || j >= this.width) return false;
  return Boolean(this.walls[j][i] & 1);
}

Level.prototype.hasRightWall = function(i, j) {
  if(j < 0 || j >= this.width) return false;
  return Boolean(this.walls[j][i+1] & 2);
}

Level.prototype.hasBottomWall = function(i, j) {
  if(j < 0 || j >= this.width) return false;
  return Boolean(this.walls[j+1][i] & 1);
}

Level.prototype.addLeftWall = function(i, j) {
  if(!this.hasLeftWall(i, j)) {
    this.walls[j][i] += 2;
    this.notifyObservers("addedLeftWall", {i: i, j: j});
    return true;
  }
  else return false;
}

Level.prototype.removeLeftWall = function(i, j) {
  if(this.hasLeftWall(i, j)) {
    this.walls[j][i] -= 2;
    this.notifyObservers("removedLeftWall", {i: i, j: j});
    return true;
  }
  else return false;
}

Level.prototype.update = function(delay) {
  this.timeSinceLastWallChanging += delay;
  if(this.timeSinceLastWallChanging >= this.timeBetweenWallChanging) {
    this.timeSinceLastWallChanging -= this.timeBetweenWallChanging;
    //Math.intRandomBetween(0, 1);

    var i, j;

    do {
      i = Math.intRandomBetween(0, this.width);
      j = Math.intRandomBetween(0, this.height);
    } while(!this.removeLeftWall(i, j));

    do {
      i = Math.intRandomBetween(0, this.width);
      j = Math.intRandomBetween(0, this.height);
    } while(!this.addLeftWall(i, j));

    /*Math.intRandomBetween(0, 1);

    Math.intRandomBetween(0, this.height);
    Math.intRandomBetween(0, this.width);
    */
  }
}

Level.prototype.addObserver = function(observer) {
  this.observable.addObserver(observer);
  return this;
}

Level.prototype.notifyObservers = function(type, values) {
  this.observable.notifyObservers(type, values);
}