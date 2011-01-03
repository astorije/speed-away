
var Level = function() {
  this.width = 20;
  this.height = 12;

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
  this.walls = null;

  this.origins = null;
}

Level.currentLevel = null;

Level.prototype.initLevel = function() {
  Level.currentLevel = this;

  this.observable = new Observable().initObservable(this);

  this.loadLevel();

  return this;
}

Level.prototype.loadLevel = function() {
  var level_index = Math.intRandomBetween(0, Levels.length-1);
  this.walls = Levels[level_index].walls;
  this.origins = Levels[level_index].origins;
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