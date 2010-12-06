
var Level = function() {
  this.width = 19;
  this.height = 11;

  this.observable = new Observable();

  /**
   * Les murs du labyrinthe, codés sur 4 bits :
   * 1 (0001) : mur au-dessus
   * 2 (0010) : mur à gauche
   * 4 (0100) : état de dessus fixe
   * 8 (1000) : état de gauche fixe
   * Exemple : 11 = 1 + 2 + 8 <=> murs au-dessus et à gauche, seul l'état de gauche est fixe
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
    [15, 5, 7, 5, 5, 7, 5, 7, 5, 5, 7, 7, 5, 7, 5, 5, 7, 7, 14],
    [10, 2, 2, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 1, 2, 14],
    [10, 2, 1, 0, 2, 2, 2, 1, 0, 2, 2, 2, 2, 1, 0, 2, 0, 2, 14],
    [10, 3, 1, 1, 0, 0, 3, 1, 1, 0, 0, 0, 3, 1, 1, 0, 1, 0, 14],
    [10, 1, 1, 1, 3, 0, 1, 1, 1, 3, 0, 1, 1, 1, 3, 0, 3, 0, 14],
    [10, 0, 2, 0, 0, 2, 0, 2, 0, 0, 2, 0, 2, 0, 0, 2, 2, 2, 14],
    [10, 2, 2, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1, 2, 2, 1, 2, 14],
    [10, 2, 1, 0, 2, 2, 2, 1, 0, 2, 2, 2, 2, 1, 0, 2, 0, 3, 14],
    [10, 3, 1, 1, 0, 0, 3, 1, 1, 0, 0, 0, 3, 1, 1, 0, 2, 0, 14],
    [10, 1, 1, 1, 3, 0, 1, 1, 1, 3, 0, 0, 1, 1, 1, 3, 0, 0, 14],
    [13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 12]
  );
}

Level.currentLevel = null;

Level.prototype.initLevel = function() {
  Level.currentLevel = this;
  this.observable = new Observable().initObservable(this);

  return this;
}

Level.getCurrentLevel = function() {
  return Level.currentLevel;
}

Level.prototype.hasLeftWall = function(i, j) {
  if(j < 0 || j >= this.width) return false;
  return Boolean(this.walls[j][i] & 2);
}

Level.prototype.isLeftStateFixed = function(i, j) {
  if(j < 0 || j >= this.width) return false;
  return Boolean(this.walls[j][i] & 8);
}

Level.prototype.hasTopWall = function(i, j) {
  if(j < 0 || j >= this.width) return false;
  return Boolean(this.walls[j][i] & 1);
}

Level.prototype.isTopStateFixed = function(i, j) {
  if(j < 0 || j >= this.width) return false;
  return Boolean(this.walls[j][i] & 4);
}

Level.prototype.hasRightWall = function(i, j) {
  if(j < 0 || j >= this.width) return false;
  return Boolean(this.walls[j][i+1] & 2);
}

Level.prototype.hasBottomWall = function(i, j) {
  if(j < 0 || j >= this.width) return false;
  return Boolean(this.walls[j+1][i] & 1);
}
Level.prototype.addTopWall = function(i, j) {
  if(!this.hasTopWall(i, j) && !this.isTopStateFixed(i, j)) {
    this.walls[j][i] += 1;
    this.notifyObservers("addedTopWall", {i: i, j: j});
    return true;
  }
  else return false;
}

Level.prototype.removeTopWall = function(i, j) {
  if(this.hasTopWall(i, j) && !this.isTopStateFixed(i, j)) {
    this.walls[j][i] -= 1;
    this.notifyObservers("removedTopWall", {i: i, j: j});
    return true;
  }
  else return false;
}

Level.prototype.addLeftWall = function(i, j) {
  if(!this.hasLeftWall(i, j) && !this.isLeftStateFixed(i, j)) {
    this.walls[j][i] += 2;
    this.notifyObservers("addedLeftWall", {i: i, j: j});
    return true;
  }
  else return false;
}

Level.prototype.removeLeftWall = function(i, j) {
  if(this.hasLeftWall(i, j) && !this.isLeftStateFixed(i, j)) {
    this.walls[j][i] -= 2;
    this.notifyObservers("removedLeftWall", {i: i, j: j});
    return true;
  }
  else return false;
}

Level.prototype.addObserver = function(observer) {
  this.observable.addObserver(observer);
  return this;
}

Level.prototype.notifyObservers = function(type, values) {
  this.observable.notifyObservers(type, values);
}