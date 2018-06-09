
var gifButtons = ["Mario", "Sonic", "Kirby", "Solid Snake", "Ryu", "Master Chief",];




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

        gameImage.attr("src", results[i].images.fixed_height.url);

        gifDiv.append(p);
        gifDiv.append(gameImage);

        $("#gifs-appear-here").prepend(gifDiv);

      }
  }
});
}