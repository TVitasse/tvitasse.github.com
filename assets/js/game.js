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
var $started = false,
    $playing = false

$window.on('load', function() {
  //displayHighscore();
    $game.blockrain({
      theme: "gameboy",
      onGameOver: function(score) {
        // readhighScore("assets/highscore.json").then(function(scores) {
        //   var flag = false;
        //   var index = 0;
        //   while (!flag) {
        //     if(scores[index]['score']<=score) {
        //       flag = true;
        //       addHighscore(score, index, scores);
        //     } else {
        //       index++;
        //     }
        //   }
        // });
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

//TODO : utiliser des appendChild
function displayHighscore() {
  readhighScore("assets/highscore.json").then(function(scores) {
    $("tbody tr").empty();
    $.each(scores, function(i){
      var trNode = document.createElement("tr");
      var playerNode = document.createElement("td");
      var scoreNode = document.createElement("td");
      playerNode.textContent = this['player']
      scoreNode.textContent = this['score']
       trNode.appendChild(playerNode);
       trNode.appendChild(scoreNode);
       document.getElementById("bodyscore").appendChild(trNode);
     })
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

//NOTE : https://stackoverflow.com/questions/20948155/simple-save-to-json-file-with-jquery
function addHighscore(score, position, scores) {
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
        const newPlayer = {
          player : $( "#player-name" ).val(),
          score : score
        }
        //Add the new player to the Board and insert it at the right place in the JSON file
        insertNewPlayer(newPlayer, position, scores);
        $( this ).dialog( "close" );
      }
    }
  ]
  });
};

//Add the current player to the board and update the score board displayed
function insertNewPlayer(newPlayer, position, scores) {
  scores.splice(position, 0, newPlayer);
  scores.splice(-1,1);
  console.log(scores);

  console.log("ready for ajax request")
  $.ajax({
    url: 'assets/highscore.json',
    dataType : 'json',
    type : 'POST',
    data: JSON.stringify(scores)
  }).done(function(response){
    console.log("ok");
    displayHighscore();
  }).fail(function(error) {
    console.log(error);
  });
};

$( "#start" ).click(function() {
  if($playing == false){
    $game.blockrain('resume');
    $game.blockrain('restart');
    $( "#start").text("Stop");
    $started = true;
    $playing = true;
  } else {
    $game.blockrain('gameover');
    $( "#start").text("Start");
    $playing = false;
    $started = false;
  }
});

$( "#pause" ).click(function() {
  if ($started){
    $game.blockrain('pause');
    $( "#pause" ).text("Resume");
    $started = false;
  } else {
    $game.blockrain('resume');
    $( "#pause" ).text("Pause");
    $started = true;
  }
});
