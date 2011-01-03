$(document).ready(function(){
  $('a#play_button').click(function() {
    GameIO.getInstance().startGame();
    $(this).fadeOut(function() {
      // Affichage du bloc joueur gauche
      $('#player1').css('opacity', 0).animate({
        'opacity': 1,
        'left': '-=150'
      });

      // Affichage du bloc joueur droit
      $('#player2').css('opacity', 0).animate({
        'opacity': 1,
        'right': '-=150'
      });

      $('#canvas').fadeIn();
    });
  });

  $('a.replay_button').live('click', function() {
    GameIO.getInstance().startGame();

    $('#game .box').slideUp(function() {
      $('#overlays').append($('#game .box'));
      $('#canvas').fadeIn();
    });
  });

});

function itemHandler(item) {
  console.log(item.targets);
  for(var i= 0; i<item.targets.length; ++i) {
    if(item.duration > 0) {
      $('<li><div style="background: url(\''+item.image.src+'\')" class="item_icon"></div><div class="outer_timer"><div class="inner_timer"></div></div></li>')
        .appendTo($('#'+item.targets[i].name+' ul.items'))
        .find('.inner_timer')
        .animate({'width': 0}, item.duration*1000, 'linear', function() {
          $(this).parents('li').fadeOut(600, function() {
            $(this).remove();
          });
        });
    }
    else {console.log('#'+item.targets[i].name+' ul.items');
      $('<li><div style="background: url(\''+item.image.src+'\')" class="item_icon"></div></li>')
        .appendTo($('#'+item.targets[i].name+' ul.items'))
        .delay(1000).fadeOut(600, function() {
          $(this).remove();
        });
    }
    $('#'+item.targets[i].name+' ul.items li:last-child').append('<div style="clear: both;"></div>');
  }
}

function player1_wins() {
  $('ul.items li').fadeOut(function() {
    $(this).remove();
  });

  $('#canvas').hide(function() {
    $('#game').append($('#player1_wins'));
    $('#player1_wins').slideDown();
  });
}

function player2_wins() {
  $('ul.items li').fadeOut(function() {
    $(this).remove();
  });

  $('#canvas').hide(function() {
    $('#game').append($('#player2_wins'));
    $('#player2_wins').slideDown();
  });
}