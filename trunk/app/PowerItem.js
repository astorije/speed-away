var PowerItem = function() {
  this.duration = 10;
}

PowerItem.prototype = new AbstractItem();

PowerItem.prototype.initPowerItem = function () {
  this.initAbstractItem(0, img_power, 3, 2);

  return this;
}

PowerItem.prototype.activate = function() {
  this.targets.push(this.catcher);
  this.catcher.mass = 2.25;
  if(this.catcher.image == img_ball_blue)
    this.catcher.image = img_big_ball_blue;
  else
    this.catcher.image = img_big_ball_red;
  this.catcher.radius = 12;
}

PowerItem.prototype.deactivate = function() {
  this.catcher.mass = 1;
  if(this.catcher.image == img_big_ball_blue)
    this.catcher.image = img_ball_blue;
  else
    this.catcher.image = img_ball_red;
  this.catcher.radius = 8;
}