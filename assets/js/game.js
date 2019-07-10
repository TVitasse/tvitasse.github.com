var	$window = $(window),
    $game = $('.game')

$window.on('load', function() {
    $game.blockrain({theme: "gameboy"});
    $game.blockrain('autoplay', false);
    $game.blockrain('controls', true);

    $('.blockrain-touch-left').hide();
    $('.blockrain-touch-right').hide();
    $('.blockrain-touch-rotate-left').hide();
    $('.blockrain-touch-rotate-right').hide();
    $('.blockrain-touch-drop').hide();
});

$( "#start" ).click(function() {
    $game.blockrain('resume');
    $game.blockrain('restart');
});

$( "#pause" ).click(function() {
  $game.blockrain('pause');
});

$( "#resume" ).click(function() {
  $game.blockrain('resume');
});

$( "#stop" ).click(function() {
  $game.blockrain('gameover');
});
