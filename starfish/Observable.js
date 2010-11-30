function Observable() {
  this.observers = new Array();
  this.observable = null;
}

Observable.prototype.initObservable = function(observable) {
  this.observable = observable;
  return this;
}

Observable.prototype.addObserver = function(observer) {
  if(!this.observers.contains(observer))
    this.observers.push(observer);
  return this;
}

Observable.prototype.removeObserver = function(observer) {
  this.observers.removeObject(observer);
  return this;
}

Observable.prototype.notifyObservers = function(type, values) {
  for(var i=0; i<this.observers.length; i++)
    this.observers[i].observe(
      this.observable,
      type,
      values
    );
}