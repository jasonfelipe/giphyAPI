//SOME BUGS!
//Mario doesn't work
//Some gifs do not show up as a still
//Some gifs do not stop when clicked




var gifButtons = ["Mario", "Sonic", "Kirby", "Solid Snake", "Ryu", "Master Chief", "Yoshi", "Crash Bandicoot"];

for (i = 0; i < gifButtons.length; i++){
    var gameButtons = $('<button>'+ gifButtons[i] + '</button>');
    gameButtons.attr("class", "showGif");
    gameButtons.attr("style", "margin:5px");
    gameButtons.attr("data-game", gifButtons[i]);
    $('#gameButtons').append(gameButtons)
      }


  $('#search').click(function(e){

    e.preventDefault();
    
    var searchTerm = $('#search-term').val().trim();
    
    gifButtons.push(searchTerm);
    
   var searchedGame = $('<button>' + searchTerm + '</button>');
   searchedGame.attr({ // entering ALL  attributes
        "class": "showGif",
        "style": "margin:5px",
        "data-game": searchTerm 
   });

   $('#gameButtons').append(searchedGame);
   $('.showGif').on("click", theSearch);

  });


//The click event
$('.showGif').on("click", theSearch);
$(".gif").on("click", runOrStop)




//The separate function.
function theSearch() {
  var game = $(this).attr("data-game");

  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    game + "&api_key=S2WxAN0l1NhiYgOVUn8rPyjLMMlcPbXK&limit=10";


  
$.ajax({
  url: queryURL,
  method: "GET"
})
  .then(function(response) {
    var results = response.data;

    for (var i = 0; i < results.length; i++) {

      if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
        var gifDiv = $("<div class='item'>");

        var rating = results[i].rating;

        var p = $("<p>").text("Rating: " + rating);

        var gameImage = $("<img>");

        gameImage.attr("src", results[i].images.original_still.url);

        gameImage.attr({
          "data-still" : results[i].images.original_still.url,
          "data-animate" : results[i].images.original.url,
          "data-state": "still"

        });

        gameImage.addClass("gif");
        gifDiv.append(p);
        gifDiv.append(gameImage);

        console.log(results[i].images)
        $("#gifs-appear-here").prepend(gifDiv);
        $(".gif").on("click", runOrStop)


      }
  }
});
}

//Add Stop and Go Functions.
function runOrStop (){
  console.log(this)
  var state = $(this).attr("data-state");

  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
}