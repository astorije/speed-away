/**
 *
 */
function RepeatingVisualGameObject() {
  this.width = 0;
  this.height = 0;
  this.scrollFactor = 1;
}

RepeatingVisualGameObject.prototype = new VisualGameObject();

RepeatingVisualGameObject.prototype.initRepeatingVisualGameObject = function(image, x, y, z, width, height, scrollFactor) {
  this.initVisualGameObject(image, x, y, z);
  this.height = height;
  this.width = width;
  this.scrollFactor = scrollFactor;
  return this;
}

RepeatingVisualGameObject.prototype.destroyRepeatingVisualGameObject = function () {
  this.destroyVisualGameObject();
}

RepeatingVisualGameObject.prototype.draw = function(delay, context, xScroll, yScroll) {
  var areaDrawn = [0, 0];
  var newPosition;
  var newFillArea;
  var newScrollPosition;
  var nb=0;

  for (var y = 0; y < this.height; y += areaDrawn[1]) {
    for (var x = 0; x < this.width; x += areaDrawn[0]) {
      // the top left corner to start drawing the next tile from
      newPosition = [this.x + x, this.y + y];
      // the amount of space left in which to draw
      newFillArea = [this.width - x, this.height - y];
      // the first time around you have to start drawing from the middle of the image
      // subsequent tiles alwyas get drawn from the top or left
      newScrollPosition = [0, 0];
      if (x==0) newScrollPosition[0] = xScroll * this.scrollFactor;
      if (y==0) newScrollPosition[1] = yScroll * this.scrollFactor;
      areaDrawn = this.drawRepeat(context, newPosition, newFillArea, newScrollPosition);

    }
  }
}

RepeatingVisualGameObject.prototype.drawRepeat = function(context, newPosition, newFillArea, newScrollPosition) {
  // find where in our repeating texture to start drawing (the top left corner)
  var xOffset = Math.abs(newScrollPosition[0]) % this.image.width;
  var yOffset = Math.abs(newScrollPosition[1]) % this.image.height;
  var left = newScrollPosition[0]<0?this.image.width-xOffset:xOffset;
  var top = newScrollPosition[1]<0?this.image.height-yOffset:yOffset;
  var width = newFillArea[0] < this.image.width-left?newFillArea[0]:this.image.width-left;
  var height = newFillArea[1] < this.image.height-top?newFillArea[1]:this.image.height-top;

  // draw the image
  context.drawImage(this.image, left, top, width, height, newPosition[0], newPosition[1], width, height);
  return [width, height];
}