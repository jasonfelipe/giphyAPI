//SOME BUGS!
//Mario doesn't work
//Some gifs do not show up as a still
//Some gifs do not stop when clicked




var gifButtons = ["Mario", "Sonic", "Kirby", "Solid Snake", "Ryu", "Master Chief", "Yoshi", "Crash Bandicoot"];

for (i = 0; i < gifButtons.length; i++){
    var characterButtons = $('<button>'+ gifButtons[i] + '</button>');
    characterButtons.attr("class", "showGif");
    characterButtons.attr("style", "margin:5px");
    characterButtons.attr("data-character", gifButtons[i]);
    $('#characterButtons').append(characterButtons)
      }


  $('#search').click(function(e){

    e.preventDefault();
    
    var searchTerm = $('#search-term').val().trim();
    
    gifButtons.push(searchTerm);
    
   var searchedCharacter = $('<button>' + searchTerm + '</button>');
   searchedCharacter.attr({ // entering ALL  attributes
        "class": "showGif",
        "style": "margin:5px",
        "data-character": searchTerm 
   });

   $('#characterButtons').append(searchedCharacter);
   $('.showGif').on("click", theSearch);

  });


//The click event
$('.showGif').on("click", theSearch);
$(".gif").on("click", runOrStop);
// $('.showGif').on('click', bioSearch);

// function bioSearch() { //testing out GiantBomb wiki API, error = No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'null' is therefore not allowed access.

//   var characterName = $(this).attr("data-character");
//   var noSpaceName = encodeURIComponent(characterName)
//   var gbKey = "f33df788078f2a427639071326cf5da2acadd069";
//   var queryURL = "https://www.giantbomb.com/api/search/?api_key=" + gbKey + "&format=json&query=" + noSpaceName + "&resources=character"

//   $.ajax({
//     url: queryURL,
//     method:"GET"
//   }).then(function(response) {
//     var results = response.results.deck
//     console.log(results)
//   })
// }

//The separate function.
function theSearch() {
  var characterName = $(this).attr("data-character");

  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    characterName + "&api_key=S2WxAN0l1NhiYgOVUn8rPyjLMMlcPbXK&limit=10";


  
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

        var characterImage = $("<img>");

        characterImage.attr("src", results[i].images.original_still.url);

        characterImage.attr({
          "data-still" : results[i].images.original_still.url,
          "data-animate" : results[i].images.original.url,
          "data-state": "still"

        });

        characterImage.addClass("gif");
        gifDiv.append(p);
        gifDiv.append(characterImage);

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