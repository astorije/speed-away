var SlowerItem = function() {
  this.duration = 3;
}

SlowerItem.prototype = new AbstractItem();

SlowerItem.prototype.initSlowerItem = function () {
  this.initAbstractItem(0, img_slower, 4, 2);

  return this;
}

SlowerItem.prototype.activate = function() {
  for(var i = 0; i<Ball.players.length; ++i) {
    if(Ball.players[i] == this.catcher)
      continue;

    this.targets.push(Ball.players[i]);

    Ball.players[i].maxSpeed /= 4;
  }
}

SlowerItem.prototype.deactivate = function() {
  for(var i = 0; i<this.targets.length; ++i)
    this.targets[i].maxSpeed *= 4;
}