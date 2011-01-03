var Starfish = function() {};

Starfish.starfishDir = 'starfish/';

Starfish.enabledClasses = {
  'Collision' : 'off',
  'Point' : 'off',
  'Circle' : 'off',
  'Segment' : 'off',
  'AARectangle' : 'off',
  'GameObject' : 'off',
  'VisualGameObject' : 'off',
  'ImageGameObject' : 'off',
  'AnimatedVisualGameObject' : 'off',
  'ShapeGameObject' : 'off',
  'RectangleShapeGameObject' : 'off',
  'LineShapeGameObject' : 'off',
  'RepeatingVisualGameObject' : 'off',
  'Utils' : 'off',
  'GameObjectManager' : 'off',
  'Keyboard' : 'off',
  'Observable' : 'off',
  'SoundManager' : 'off',
};

Starfish.load = function() {
  for(var klass in Starfish.enabledClasses)
    if(Starfish.enabledClasses[klass] == 'on')
      document.write("<script type='text/javascript' src='starfish/"+klass+".js'></script>");
};

Starfish.enable = function(klass) {
  if(klass instanceof Array)
    for(var i=0; i<klass.length; i++)
      Starfish.enable(klass[i]);
  else
    if(Starfish.enabledClasses[klass])
      Starfish.enabledClasses[klass] = 'on';
    else
      alert('Starfish class \''+klass+'\' does not exist.');
};