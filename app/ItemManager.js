var ItemManager = function() {
  this.maxItems = 5;
  this.itemClassNames = [
    MirrorItem
  ];
  this.runningItems = null;
}

ItemManager.prototype.initItemManager = function() {
  this.runningItems = new Array();

  for(var i=0; i<this.maxItems; ++i)
    this.runningItems.push(new this.itemClassNames[0]());

  return this;
}

ItemManager.prototype.update = function(delay, context, xScroll, yScroll) {

}