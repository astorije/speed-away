var AbstractItem = function() {
  this.observable = null;
  this.catcher = null;

  this.active = null;
  this.duration = null;
}

AbstractItem.prototype = new AnimatedVisualGameObject();

AbstractItem.prototype.initAbstractItem = function (z, image, frameCount, fps) {
  this.initAnimatedVisualGameObject(0, 0, z, image, frameCount, fps);

  this.observable = new Observable().initObservable(this);

  return this;
}

AbstractItem.prototype.launchEffect = function() {
  this.active = true;
  this.activate();

  this.observable.notifyObservers("activated");
}

AbstractItem.prototype.update = function (dt, context, xScroll, yScroll) {
  if(this.active) {
    this.duration -= dt;

    if(this.duration <= 0) {
      if(this.deactivate) {
        this.deactivate();
        this.observable.notifyObservers("deactivated");
      }
      this.active = false;
    }
  }
}