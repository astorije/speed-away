var FasterItem = function() {
  this.active = false;
  this.duration = 5;
}

FasterItem.prototype = new AbstractItem();

FasterItem.prototype.initFasterItem = function () {
  this.initAbstractItem(0, img_faster, 3, 2);

  return this;
}

FasterItem.prototype.activate = function() {
  this.catcher.maxSpeed *= 4;
}

FasterItem.prototype.deactivate = function() {
  this.catcher.xSpeed /= 4;
}