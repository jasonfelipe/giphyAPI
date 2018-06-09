
var gifButtons = ["Mario", "Sonic", "Kirby"];

for (i = 0; i < gifButtons.length; i++){
    $('#gameButtons').append("<button id='gameButton' style='margin:5px' data-game=" + gifButtons[i] + ">" + gifButtons[i] + "</button>"); //for some reason giving #buttons .attr didn't work, so I brute forced it.
    
  }

console.log(gameButtons)

$('#gameButton').on("click", function() {
    var game = $(this).attr("data-game");
    
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      game + "&api_key=S2WxAN0l1NhiYgOVUn8rPyjLMMlcPbXK&limit=10&tag=game";
    
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
});

$('#search').click(function(e){

e.preventDefault();

var searchTerm = $('#search-term').val().trim();

console.log(searchTerm)
//add script to put button.
gifButtons.push(searchTerm);
console.log(gifButtons)

$('#gameButtons').append("<button id='gameButton' style='margin:5px' data-game=>" + searchTerm + "</button>")




})
    
