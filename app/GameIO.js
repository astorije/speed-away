var GameIO = function() {}

GameIO.instance = null;

GameIO.getInstance = function() {
  if(!GameIO.instance)
    GameIO.instance = new GameIO().initGameIO();
  return GameIO.instance;
}

GameIO.prototype.initGameIO = function() {
  return this;
}

GameIO.prototype.observe = function(observable, type, values) {
  if(observable instanceof ExitItem) {
    if(observable.catcher.name == 'player1')
      player1_wins();
    else
      player2_wins();
  }
  else if(observable instanceof AbstractItem) {
    if(type == "activated") {
      itemHandler(observable);
    }
  }
}