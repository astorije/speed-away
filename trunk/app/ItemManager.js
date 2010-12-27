var ItemManager = function() {
  this.maxItems = 5;
  this.itemClassNames = [
    MirrorItem
  ];
  this.runningItems = null;
  this.levelView = null;

  this.timeBeforeNextItem = null;

  this.observable = null;
  this.gameObjectsToCreate = null;
}

ItemManager.prototype = new GameObject();

ItemManager.prototype.initItemManager = function(levelView, player1, player2) {
  this.initGameObject(0, 0, 0);

  this.runningItems = new Array();
  this.timeBeforeNextItem = Math.intRandomBetween(1, 3);

  this.levelView = levelView;
  this.player1 = player1;
  this.player2 = player2;
 // this.observable = new Observable().initObservable(this);
 // this.gameObjectsToCreate = new Array();

  return this;
}

ItemManager.prototype.createGameObject = function(object) {
 // this.gameObjectsToCreate.push(object);
 // this.observable.notifyObservers();
  return object;
}

ItemManager.prototype.update = function(delay, context, xScroll, yScroll) {
  this.timeBeforeNextItem -= delay;
  if(this.timeBeforeNextItem <= 0) {
    this.timeBeforeNextItem = Math.intRandomBetween(4, 10);
    if(this.runningItems.length < this.maxItems) {
      var item = this.createGameObject(new MirrorItem().initMirrorItem());
      var good_position = false;
      while(!good_position) {
        good_position = true;
        while(false === this.levelView.loadObjectAt(item,
          Math.intRandomBetween(0, this.levelView.level.width - 1),
          Math.intRandomBetween(0, this.levelView.level.height - 1)
        )) {}
        for(var i=0; i<this.runningItems.length; i++)
          if(this.runningItems[i].x == item.x && this.runningItems[i].y == item.y) {
            good_position = false;
            break;
          }
      }
      this.runningItems.push(item);
      for(var i=0; i<this.collidingObjects.length; i++)
        this.collidingObjects[i].canCollideWith(item);
      item.observable.addObserver(this);
    }
  }
}

ItemManager.prototype.observe = function(observable, type, values) {
  if(observable instanceof MirrorItem) {
    this.runningItems.removeObject(observable);
    observable.launchEffect(this.player1, this.player2);
  }
}