var	$window = $(window),
    $game = $('.game')
const $cssButton = {
      "-moz-appearance": "none",
      "-webkit-appearance": "none",
      "-ms-appearance": "none",
      appearance: "none",
      "-moz-transition": "background-color 0.2s ease-in-out, color 0.2s ease-in-out",
      "-webkit-transition": "background-color 0.2s ease-in-out, color 0.2s ease-in-out",
      "-ms-transition": "background-color 0.2s ease-in-out, color 0.2s ease-in-out",
      transition: "background-color 0.2s ease-in-out, color 0.2s ease-in-out",
      "background-color": "transparent",
      "border-radius": "0.375em",
      border: "0",
      "box-shadow": "inset 0 0 0 2px #f56a6a",
      color: "#f56a6a !important",
      "cursor": "pointer",
      "display": "inline-block",
      "font-family": "Roboto Slab, serif",
      "font-size": "0.8em",
      "font-weight": "700",
      "height": "3.5em",
      "letter-spacing": "0.075em",
      "line-height": "3.5em",
      "padding": "0 2.25em",
      "text-align": "center",
      "text-decoration": "none",
      "text-transform": "uppercase",
      "white-space": "nowrap"
    }

$window.on('load', function() {
  displayHighscore();
    $game.blockrain({
      theme: "gameboy",
      onGameOver: function(score) {
        //TODO : check if the player has a good enough score to go in the scoreboard
        addHighscore(score)
      }
    });
    $game.blockrain('autoplay', false);
    $game.blockrain('controls', true);

    $('.blockrain-touch-left').hide();
    $('.blockrain-touch-right').hide();
    $('.blockrain-touch-rotate-left').hide();
    $('.blockrain-touch-rotate-right').hide();
    $('.blockrain-touch-drop').hide();
});

function displayHighscore() {
  //scores = readhighScore("assets/highscore.json");
  readhighScore("assets/highscore.json").then(function(scores) {
    $.each(scores, function(i){
       var newRow = "<tr><td>"+this['player']+"</td><td>"+this['score']+"</td></tr>";
       $("tbody tr:last").after(newRow);
     })
     $("tbody tr:first").remove();
  });
}

function readhighScore(pathJSON) {
  var deferred = $.Deferred();

  try {
    jQuery.when(
      jQuery.getJSON(pathJSON)
    ).done( function(json) {
        deferred.resolve(json)
        });
    } catch(e) {
        alert(e);
    }
    return deferred.promise();
}

function addHighscore(score) {
  var modalContent = "<div style=\"text-align:center\">You got "+score+" points ! <br/> Do you want to be in the highscore board ?</div>"
  + "<br/><input type=\"text\" name=\"player-name\" id=\"player-name\" value=\"\" placeholder=\"Name\" <br/>";
  $(".modal").html(modalContent);
  $(".modal").dialog({
  modal: true,
  buttons: [
    {
      text: "Nope",
      class: 'nopeButton',
      open: function() {
        $( this ).css($cssButton);
        $( this ).css("left", "-34px");
      },
      click: function() {
        $( this ).dialog( "close" );
      }
    },
    {
      text: "Yass",
      class: 'yassButton',
      open: function() {
        $( this ).css($cssButton);
      },
      click: function() {
        //TODO :
        const newPlayer = {
          player : $( "#player-name" ).val(),
          score : score
        }
        //Add the new player to the Board
        insertNewPlayer(newPlayer);
        $( this ).dialog( "close" );
      }
    }
  ]
  });
};

function insertNewPlayer(newPlayer) {
  console.log(newPlayer);
};

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
