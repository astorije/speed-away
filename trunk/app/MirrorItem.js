var MirrorItem = function() {
  this.observable = null;
}

MirrorItem.prototype = new AnimatedVisualGameObject();

MirrorItem.prototype.initMirrorItem = function () {
  this.initAnimatedVisualGameObject(30, 30, 0, img_mirror, 2, 2);

  this.observable = new Observable().initObservable(this);

  return this;
}

MirrorItem.prototype.launchEffect = function(player1, player2) {
  var x_tmp = player1.x;
  var y_tmp = player1.y;

  player1.x = player2.x;
  player1.y = player2.y;

  player2.x = x_tmp;
  player2.y = y_tmp;

  player1.updateCenter();
  player2.updateCenter();
}