var MirrorItem = function() {
  this.duration = 5;
}

MirrorItem.prototype = new AbstractItem();

MirrorItem.prototype.initMirrorItem = function () {
  this.initAbstractItem(0, img_mirror, 2, 2);

  return this;
}

MirrorItem.prototype.activate = function() {
  this.targets = Ball.players;

  var upKey_previous = Ball.players[0].upKey;
  var downKey_previous = Ball.players[0].downKey;
  var leftKey_previous = Ball.players[0].leftKey;
  var rightKey_previous = Ball.players[0].rightKey;
  var upKey_current, downKey_current, leftKey_current, rightKey_current;

  for(var i=1; i<Ball.players.length; ++i) {
    upKey_current = Ball.players[i].upKey;
    downKey_current = Ball.players[i].downKey;
    leftKey_current = Ball.players[i].leftKey;
    rightKey_current = Ball.players[i].rightKey;

    Ball.players[i].upKey = upKey_previous;
    Ball.players[i].downKey = downKey_previous;
    Ball.players[i].leftKey = leftKey_previous;
    Ball.players[i].rightKey = rightKey_previous;

    Ball.players[i].up = false;
    Ball.players[i].down = false;
    Ball.players[i].left = false;
    Ball.players[i].right = false;

    upKey_previous = upKey_current;
    downKey_previous = downKey_current;
    leftKey_previous = leftKey_current;
    rightKey_previous = rightKey_current;
  }

  Ball.players[0].upKey = upKey_previous;
  Ball.players[0].downKey = downKey_previous;
  Ball.players[0].leftKey = leftKey_previous;
  Ball.players[0].rightKey = rightKey_previous;

  Ball.players[0].up = false;
  Ball.players[0].down = false;
  Ball.players[0].left = false;
  Ball.players[0].right = false;
}

MirrorItem.prototype.deactivate = function() {
  var l = Ball.players.length - 1;

  var upKey_previous = Ball.players[l].upKey;
  var downKey_previous = Ball.players[l].downKey;
  var leftKey_previous = Ball.players[l].leftKey;
  var rightKey_previous = Ball.players[l].rightKey;
  var upKey_current, downKey_current, leftKey_current, rightKey_current;

  for(var i=l-1; i>=0; --i) {
    upKey_current = Ball.players[i].upKey;
    downKey_current = Ball.players[i].downKey;
    leftKey_current = Ball.players[i].leftKey;
    rightKey_current = Ball.players[i].rightKey;

    Ball.players[i].upKey = upKey_previous;
    Ball.players[i].downKey = downKey_previous;
    Ball.players[i].leftKey = leftKey_previous;
    Ball.players[i].rightKey = rightKey_previous;

    Ball.players[i].up = false;
    Ball.players[i].down = false;
    Ball.players[i].left = false;
    Ball.players[i].right = false;

    upKey_previous = upKey_current;
    downKey_previous = downKey_current;
    leftKey_previous = leftKey_current;
    rightKey_previous = rightKey_current;
  }

  Ball.players[l].upKey = upKey_previous;
  Ball.players[l].downKey = downKey_previous;
  Ball.players[l].leftKey = leftKey_previous;
  Ball.players[l].rightKey = rightKey_previous;

  Ball.players[l].up = false;
  Ball.players[l].down = false;
  Ball.players[l].left = false;
  Ball.players[l].right = false;
}