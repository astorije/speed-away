var SoundManager = function() {
  this.sounds = null;
  this.playableEvents = null;
};

SoundManager.prototype.initSoundManager = function() {
  var sounds = document.getElementById('sounds').children;

  this.sounds = new Object();
  this.playableEvents = new Object();

  for(var i=0; i<sounds.length; ++i)
    this.sounds[sounds[i].id] = sounds[i];

  return this;
};

SoundManager.prototype.playSound = function(soundId, volume) {
  if(this.sounds[soundId]) {
    this.sounds[soundId].currentTime = 0;

    if(volume != null)
      this.sounds[soundId].volume = volume;

    this.sounds[soundId].play();
  }
}
SoundManager.prototype.setLoop = function(soundId, volume) {
  if(this.sounds[soundId])
    //this.sounds[soundId].loop = "loop"; // Ne fonctionne pas sous FF
    this.sounds[soundId].addEventListener('ended', function() {
      this.currentTime = 0;
      this.play();
    }, false);
}

SoundManager.prototype.playSoundWhenObserve = function(soundId, event) {
  this.playableEvents[event] = soundId;
}

SoundManager.prototype.observe = function(observable, type, values) {
  if(type !== null && this.playableEvents[type] !== undefined)
    this.playSound(this.playableEvents[type]);
}