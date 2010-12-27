module("Ball", {
  setup: function() {
    var gameObjectManager = new GameObjectManager();
    GameObjectManager.instance = gameObjectManager;
    gameObjectManager.gameObjects = new Array();

    var image = new Image();
    image.height = 24;
    image.width = 24;
    ball = new Ball().initBall(30, image, null, null, null, null);
  }
});

test('initBall()', 1, function() {
  equals(ball.zOrder, 30);
});

test('getCasesUnder()', 1, function() {
  var levelView = new LevelView().initLevelView(0, 0, 0);

  deepEqual(
    ball.getCasesUnder(levelView),
    [
      [0, 0],
    /*  [1, 0],
      [0, 1],
      [1, 1]*/
    ]
  );
});

test('updateBoundingBox()', 2, function() {
  ball.center = new Point().initPoint(100, 60);
  ball.updateBoundingBox();

  equals(ball.boundingBox.center.x, 100);
  equals(ball.boundingBox.center.y, 60);
});

test('updateCenter()', 3, function() {
  ball.x = 40;
  ball.y = 60;
  ball.updateCenter();

  equals(ball.center.x, 40 + ball.image.width/2);
  equals(ball.center.y, 60 + ball.image.height/2);
  equals(ball.boundingBox.center, ball.center);
});

module('Level', {
  setup: function() {
    level = new Level().initLevel();
  },
  teardown: function() {
    delete level;
  }
});

function notOk(value, message) {
  QUnit.push(!value, value, false, message);
}

test('hasLeftWall()', function() {
  notOk(level.hasLeftWall(-10, 5));
  notOk(level.hasLeftWall(1, -5));
  notOk(level.hasLeftWall(-1, -5));
  notOk(level.hasLeftWall(500, 5));
  notOk(level.hasLeftWall(1, 500));
  notOk(level.hasLeftWall(500, 500));

  for(var j=0; j<level.height; j++)
    for(var i=0; i<level.width-1; i++)
      if(level.walls[j][i] == 2 || level.walls[j][i] == 3
      || level.walls[j][i] == 6 || level.walls[j][i] == 7
      || level.walls[j][i] == 10 || level.walls[j][i] == 11
      || level.walls[j][i] == 14 || level.walls[j][i] == 15)
        ok(level.hasLeftWall(i, j));
      else
        notOk(level.hasLeftWall(i, j));
});

test('isTopStateFixed()', function() {
  notOk(level.isTopStateFixed(-10, 5));
  notOk(level.isTopStateFixed(1, -5));
  notOk(level.isTopStateFixed(-1, -5));
  notOk(level.isTopStateFixed(500, 5));
  notOk(level.isTopStateFixed(1, 500));
  notOk(level.isTopStateFixed(500, 500));

  for(var j=0; j<level.height; j++)
    for(var i=0; i<level.width-1; i++)
      if(level.walls[j][i] == 4 || level.walls[j][i] == 12
      || level.walls[j][i] == 5 || level.walls[j][i] == 13
      || level.walls[j][i] == 6 || level.walls[j][i] == 14
      || level.walls[j][i] == 7 || level.walls[j][i] == 15)
        ok(level.isTopStateFixed(i, j));
      else
        notOk(level.isTopStateFixed(i, j));
});

test('isLeftStateFixed()', function() {
  notOk(level.isLeftStateFixed(-10, 5));
  notOk(level.isLeftStateFixed(1, -5));
  notOk(level.isLeftStateFixed(-1, -5));
  notOk(level.isLeftStateFixed(500, 5));
  notOk(level.isLeftStateFixed(1, 500));
  notOk(level.isLeftStateFixed(500, 500));

  for(var j=0; j<level.height; j++)
    for(var i=0; i<level.width-1; i++)
      if(level.walls[j][i] == 8 || level.walls[j][i] == 12
      || level.walls[j][i] == 9 || level.walls[j][i] == 13
      || level.walls[j][i] == 10 || level.walls[j][i] == 14
      || level.walls[j][i] == 11 || level.walls[j][i] == 15)
        ok(level.isLeftStateFixed(i, j));
      else
        notOk(level.isLeftStateFixed(i, j));
});

test('hasRightWall()', function() {
  notOk(level.hasRightWall(-10, 5));
  notOk(level.hasRightWall(1, -5));
  notOk(level.hasRightWall(-1, -5));
  notOk(level.hasRightWall(500, 5));
  notOk(level.hasRightWall(1, 500));
  notOk(level.hasRightWall(500, 500));

  for(var j=0; j<level.height; j++)
    for(var i=0; i<level.width-1; i++)
      if(level.walls[j][i+1] == 2 || level.walls[j][i+1] == 3
      || level.walls[j][i+1] == 6 || level.walls[j][i+1] == 7
      || level.walls[j][i+1] == 10 || level.walls[j][i+1] == 11
      || level.walls[j][i+1] == 14 || level.walls[j][i+1] == 15)
        ok(level.hasRightWall(i, j));
      else
        notOk(level.hasRightWall(i, j));
});

test('hasTopWall()', function() {
  notOk(level.hasTopWall(-10, 5));
  notOk(level.hasTopWall(1, -5));
  notOk(level.hasTopWall(-1, -5));
  notOk(level.hasTopWall(500, 5));
  notOk(level.hasTopWall(1, 500));
  notOk(level.hasTopWall(500, 500));

  for(var j=0; j<level.height-1; j++)
    for(var i=0; i<level.width; i++)
      if(level.walls[j][i] == 1 || level.walls[j][i] == 3
      || level.walls[j][i] == 5 || level.walls[j][i] == 7
      || level.walls[j][i] == 9 || level.walls[j][i] == 11
      || level.walls[j][i] == 13|| level.walls[j][i] == 15)
        ok(level.hasTopWall(i, j));
      else
        notOk(level.hasTopWall(i, j));
});

test('hasBottomWall()', function() {
  notOk(level.hasBottomWall(-10, 5));
  notOk(level.hasBottomWall(1, -5));
  notOk(level.hasBottomWall(-1, -5));
  notOk(level.hasBottomWall(500, 5));
  notOk(level.hasBottomWall(1, 500));
  notOk(level.hasBottomWall(500, 500));

  for(var j=0; j<level.height-1; j++)
    for(var i=0; i<level.width; i++)
      if(level.walls[j+1][i] == 1 || level.walls[j+1][i] == 3
      || level.walls[j+1][i] == 5 || level.walls[j+1][i] == 7
      || level.walls[j+1][i] == 9 || level.walls[j+1][i] == 11
      || level.walls[j+1][i] == 13 || level.walls[j+1][i] == 15)
        ok(level.hasBottomWall(i, j));
      else
        notOk(level.hasBottomWall(i, j));
});

module('LevelView', {
  setup: function() {
    levelView = new LevelView();
  }
});

test('initLevelView()', 5, function() {
  levelView.initLevelView(10, 11, 12);

  equal(levelView.x, 10);
  equal(levelView.y, 11);
  equal(levelView.zOrder, 12);
  ok(levelView.level instanceof Level);
  ok(levelView.level.observable.observers.contains(levelView));
});

test('obstacleAt()', 4, function() {
  levelView.initLevelView(0, 0, 0);
  var image = new Image();
  image.width = 24;
  image.height = 24;
  var b1 = new Ball().initBall(1, image, null, null, null, null)

  levelView.canCollideWith(b1);

  ok(levelView.obstacleAt(0, 0));
  /*ok(levelView.obstacleAt(0, 1));
  ok(levelView.obstacleAt(1, 0));
  ok(levelView.obstacleAt(1, 1));
  */notOk(levelView.obstacleAt(0, 2));
  notOk(levelView.obstacleAt(2, 0));
  notOk(levelView.obstacleAt(2, 2));

});

module('LineShapeGameObject', {
  setup: function() {
    line = new LineShapeGameObject();
  }
});

test('initLineShapeGameObject()', 8, function() {
  equal(
    line.initLineShapeGameObject(10, 11, 50, 2, '#123', 100, 101),
    line
  );
  equal(line.x, 10);
  equal(line.y, 11);
  equal(line.zOrder, 50);
  equal(line.toX, 100);
  equal(line.toY, 101);
  equal(line.lineWidth, 2);
  equal(line.strokeStyle, '#123');
});

module('Observable', {
  setup: function() {
    observable = new Observable();
  }
});

test('initObservable()', 3, function() {
  var o = new Object();
  equal(observable.observable, null);
  equal(observable.initObservable(o), observable);
  equal(observable.observable, o);
});

test('addObserver()', 3, function() {
  observable.initObservable(new Object());

  var observersCount = observable.observers.length;
  var a = new Object();
  var b = new Object();

  equal(observable.addObserver(a), observable);
  equal(observable.observers.length, observersCount + 1);

  observable.addObserver(a);
  observable.addObserver(b);
  equal(observable.observers.length, observersCount + 2);
});

test('removeObserver()', 3, function() {
  observable.initObservable(new Object());

  var observersCount = observable.observers.length;
  var a = new Object();
  var b = new Object();

  observable.addObserver(a);

  equal(observable.removeObserver(a), observable);
  equal(observable.observers.length, observersCount);

  observable.removeObserver(a);
  observable.removeObserver(b);
  equal(observable.observers.length, observersCount);
});

test('notifyObservers()', 3, function() {
  observable.initObservable(new Object());

  var observersCount = observable.observers.length;
  function Obs() {
    this.called = false;
    this.observe = function(type, values) { this.called = true; }
  }
  var obs_a = new Obs()
  var obs_b = new Obs();

  observable.addObserver(obs_a);
  equal(observable.notifyObservers(), undefined);

  ok(obs_a.called);
  notOk(obs_b.called);
});

module('Utils');

test('Array.remove()', 2, function() {
  var array = new Array('a', 'b', 'c', 'd', 'e');
  array.remove(1);
  deepEqual(array, ['a', 'c', 'd', 'e']);
  array.remove(0, 2);
  deepEqual(array, ['e']);
});

test('Array.removeObject()', 2, function() {
  var array = new Array('a', 'b', 'c', 'a', 'e');
  array.removeObject("a");
  deepEqual(array, ['b', 'c', 'e']);
  array.removeObject('z');
  deepEqual(array, ['b', 'c', 'e']);
});

test('Array.contains()', 5, function() {
  var array = new Array('a', 'b', 'c', 'a', 'e');
  ok(array.contains('a'));
  ok(array.contains('e'));
  ok(array.contains('c'));
  notOk(array.contains('d'));

  var array2 = new Array(['z', 'y'], ['x', 'w']);
  notOk(array2.contains(['z', 'y']));
});

test('Math.intRandomBetween', function() {
  var rand, old;
  var notAllEquals = false;

  for(var i = 0; i < 5; i++) {
    old = rand;
    rand = Math.intRandomBetween(0, 3);
    if(old == null) old = rand;

    if(rand >= 0 && rand <= 3)
      ok(true, 'int between 0 and 3: '+rand);
    else if(rand < 0)
      ok(false, 'int under 0: '+rand);
    else if(rand > 3)
      ok(false, 'int over 3: '+rand);
    else
      ok(false, 'not an int: '+rand);

    if(!notAllEquals && rand != old)
      notAllEquals = true;
  }
  ok(notAllEquals, "result is actually random");

  notAllEquals = false;
  rand = null;
  for(var i = 0; i < 10; i++) {
    old = rand;
    rand = Math.intRandomBetween(0, 1);
    if(old === null) old = rand;

    if(rand >= 0 && rand <= 1)
      ok(true, 'int between 0 and 1: '+rand);

    if(!notAllEquals && rand != old)
      notAllEquals = true;
  }
  ok(notAllEquals, "result is actually random");
});