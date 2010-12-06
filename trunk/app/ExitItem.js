var ExitItem = function() {
}

ExitItem.prototype = new AnimatedVisualGameObject();

ExitItem.prototype.initExitItem = function () {
  var image = new Image();
  image.src = 'img/depart.png';
  this.initAnimatedVisualGameObject(30, 30, 0, image, 3, 3);

  return this;
}