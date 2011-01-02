var MirrorItem = function() {
  this.active = false;
  this.duration = 2;
}

MirrorItem.prototype = new AbstractItem();

MirrorItem.prototype.initMirrorItem = function () {
  this.initAbstractItem(0, img_mirror, 2, 2);

  return this;
}

MirrorItem.prototype.activate = function() {
  var x_previous = Ball.players[0].x;
  var y_previous = Ball.players[0].y;
  var x_current, y_current;

  for(var i=1; i<Ball.players.length; ++i) {
    x_current = Ball.players[i].x;
    y_current = Ball.players[i].y;

    Ball.players[i].x = x_previous;
    Ball.players[i].y = y_previous;
    Ball.players[i].updateCenter();

    x_previous = x_current;
    y_previous = y_current;
  }

  Ball.players[0].x = x_previous;
  Ball.players[0].y = y_previous;
  Ball.players[0].updateCenter();
}