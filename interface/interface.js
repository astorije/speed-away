$(document).ready(function(){
  // Affichage du bloc joueur gauche
  $('#player1').css('opacity', 0).delay(1000).animate({
    'opacity': 1,
    'left': '-=150'
  }, 1000);
  // Affichage du bloc joueur droit
  $('#player2').css('opacity', 0).delay(1000).animate({
    'opacity': 1,
    'right': '-=150'
  }, 1000);
});

function itemHandler(item) {
  console.log(item.targets);
  for(var i= 0; i<item.targets.length; ++i) {
    if(item.duration > 0) {
      $('<li><div style="background: url(\''+item.image.src+'\')" class="item_icon"></div><div class="outer_timer"><div class="inner_timer"></div></div></li>')
        .appendTo($('#'+item.targets[i].name+' ul.items'))
        .find('.inner_timer')
        .animate({'width': 0}, item.duration*1000, 'linear', function() {
          $(this).parents('li').fadeOut(600);
        });
    }
    else {console.log('#'+item.targets[i].name+' ul.items');
      $('<li><div style="background: url(\''+item.image.src+'\')" class="item_icon"></div></li>')
        .appendTo($('#'+item.targets[i].name+' ul.items'))
        .delay(1000).fadeOut(600);
    }
    $('#'+item.targets[i].name+' ul.items li:last-child').append('<div style="clear: both;"></div>');
  }
}

function player1_wins() {
  $('#canvas').hide(function() {
    $('#game').html($('#player1_wins'));
    $('#player1_wins').slideDown(600);
  });
}

function player2_wins() {
  $('#canvas').hide(function() {
    $('#game').html($('#player2_wins'));
    $('#player2_wins').slideDown(600);
  });
}