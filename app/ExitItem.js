var ExitItem = function() {
  this.observable = null;
}

ExitItem.prototype = new AnimatedVisualGameObject();

ExitItem.prototype.initExitItem = function () {
  this.observable = new Observable().initObservable(this);

  this.initAnimatedVisualGameObject(30, 30, 0, img_exit, 2, 2);

  return this;
}