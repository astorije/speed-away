var FasterItem = function() {
  this.duration = 5;
}

FasterItem.prototype = new AbstractItem();

FasterItem.prototype.initFasterItem = function () {
  this.initAbstractItem(0, img_faster, 3, 2);

  return this;
}

FasterItem.prototype.activate = function() {
  this.targets.push(this.catcher);
  this.catcher.maxSpeed *= 2;
}

FasterItem.prototype.deactivate = function() {
  this.catcher.maxSpeed /= 2;
}