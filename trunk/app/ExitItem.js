var ExitItem = function() {
  this.active = false;
  this.duration = 0;
}

ExitItem.prototype = new AbstractItem();

ExitItem.prototype.initExitItem = function () {
  this.initAbstractItem(0, img_exit, 2, 2);

  return this;
}

ExitItem.prototype.activate = function() {
  this.targets.push(this.catcher);
}