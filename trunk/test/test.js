module("Ball", {
  setup: function() {
    ball = new Ball().initBall(10, 20, 30, new Image(), null, null, null, null);
  },
  teardown: function() {
    delete ball;
  }
});

test('ball position', 3, function() {
  equals(ball.x, 10);
  equals(ball.y, 20);
  equals(ball.zOrder, 30);
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
      if(level.walls[j][i] == 2 || level.walls[j][i] == 3)
        ok(level.hasLeftWall(i, j));
      else
        notOk(level.hasLeftWall(i, j));
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
      if(level.walls[j][i+1] == 2 || level.walls[j][i+1] == 3)
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
      if(level.walls[j][i] == 1 || level.walls[j][i] == 3)
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
      if(level.walls[j+1][i] == 1 || level.walls[j+1][i] == 3)
        ok(level.hasBottomWall(i, j));
      else
        notOk(level.hasBottomWall(i, j));
});

module('Observable', {
  setup: function() {
    observable = new Observable();
  }
});

test('initObservable()', 3, function() {
  var o = new Object();
  equal(observable.observable, null);
  deepEqual(observable.initObservable(o), observable);
  deepEqual(observable.observable, o);
});

test('addObserver()', 3, function() {
  observable.initObservable(new Object());

  var observersCount = observable.observers.length;
  var a = new Object();
  var b = new Object();

  deepEqual(observable.addObserver(a), observable);
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

  deepEqual(observable.removeObserver(a), observable);
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
  deepEqual(array, array);
});

test('Array.contains()', 4, function() {
  var array = new Array('a', 'b', 'c', 'a', 'e');
  ok(array.contains('a'));
  ok(array.contains('e'));
  ok(array.contains('c'));
  notOk(array.contains('d'));
});

test('Math.intRandomBetween', function() {
  var rand, old;
  var notAllEquals = false;

  for(var i = 0; i < 5; i++) {
    old = rand;
    rand = Math.intRandomBetween(0, 3);
    if(old == null) old = rand;

    if(rand == 0 || rand == 1 || rand == 2 || rand == 3)
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
});