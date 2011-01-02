var GameIO = function() {}

GameIO.prototype.initGameIO = function() {
  return this;
}

GameIO.prototype.observe = function(observable, type, values) {
  if(observable instanceof ExitItem) {
    testJQ();
  }
  if(observable instanceof AbstractItem) {
    if(type == "activated") {
    }
    else if(type == "deactivated") {
    }
  }
}