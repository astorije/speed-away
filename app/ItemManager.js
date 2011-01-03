var ItemManager = function() {
  this.maxItems = Config.maxItemNumber;

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
  this.timeBeforeNextItem = Math.intRandomBetween(
    Config.minTimeBeforeNextItem,
    Config.maxTimeBeforeNextItem
  );

  this.levelView = levelView;
  this.player1 = player1;
  this.player2 = player2;

  return this;
}

ItemManager.prototype.update = function(delay, context, xScroll, yScroll) {
  this.timeBeforeNextItem -= delay;
  if(this.timeBeforeNextItem <= 0) {
    this.timeBeforeNextItem = Math.intRandomBetween(
      Config.minTimeBeforeNextItem,
      Config.maxTimeBeforeNextItem
    );
    if(this.runningItems.length < this.maxItems) {
      switch(Math.intRandomBetween(0, 4)) {
        case 0:
          var item = new SwitchItem().initSwitchItem();
          break;
        case 1:
          var item = new FasterItem().initFasterItem();
          break;
        case 2:
          var item = new SlowerItem().initSlowerItem();
          break;
        case 3:
          var item = new MirrorItem().initMirrorItem();
          break;
        case 4:
          var item = new PowerItem().initPowerItem();
          break;
      }

      item.observable.addObserver(GameIO.getInstance());

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
  }
  else if(observable instanceof FasterItem) {
    this.runningItems.removeObject(observable);
  }
}