//Stops CORS error
(function () {
  var cors_api_host = 'cors-anywhere.herokuapp.com';
  var cors_api_url = 'https://' + cors_api_host + '/';
  var slice = [].slice;
  var origin = window.location.protocol + '//' + window.location.host;
  var open = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function () {
    var args = slice.call(arguments);
    var targetOrigin = /^https?:\/\/([^\/]+)/i.exec(args[1]);
    if (targetOrigin && targetOrigin[0].toLowerCase() !== origin &&
      targetOrigin[1] !== cors_api_host) {
      args[1] = cors_api_url + args[1];
    }
    return open.apply(this, args);
  };
})();
//-------------------------

$('#information').hide();

//Starting Buttons
var gifButtons = ["Mario", "Sonic", "Kirby", "Solid Snake", "Ryu", "Master Chief", "Yoshi", "Crash Bandicoot"];

//Makes Buttons for the array above
for (i = 0; i < gifButtons.length; i++) {
  var characterButtons = $('<button>' + gifButtons[i] + '</button>');
  characterButtons.attr("class", "showGif btn btn-primary"); //putting attributes one at a time
  characterButtons.attr("style", "margin:5px");
  characterButtons.attr("data-character", gifButtons[i]);
  $('#characterButtons').append(characterButtons)
}

//Our Search Button Function
$('#search').click(function (e) {

  e.preventDefault();

  var searchTerm = $('#search-term').val().trim();

  gifButtons.push(searchTerm);

  var searchedCharacter = $('<button>' + searchTerm + '</button>');
  searchedCharacter.attr({ // entering ALL  attributes
    "class": "showGif btn btn-primary",
    "style": "margin:5px",
    "data-character": searchTerm
  });

  $('#characterButtons').append(searchedCharacter);
  $('.showGif').on("click", emptyGifs);
  $('.showGif').on("click", theSearch);
  $('.showGif').on('click', bioSearch);

});


//Sets up Click Event for the Functions THEY RUN IN THIS EXACT ORDER!
$('.showGif').on("click", emptyGifs);
$('.showGif').on("click", theSearch);
$('.showGif').on('click', bioSearch);
$(".gif").on("click", runOrStop);



//To Empty Our Gifs Area.
function emptyGifs() {
  $('#gifs-appear-here').empty();
}

//Biography Search Function
function bioSearch() {

  var characterName = $(this).attr("data-character");
  var noSpaceName = encodeURIComponent(characterName)
  var gbKey = "f33df788078f2a427639071326cf5da2acadd069";
  var queryURL = "https://www.giantbomb.com/api/search/?api_key=" + gbKey + "&format=json&query=" + noSpaceName + "&resources=character"

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {

    var results = response.results[0].deck

    $('#display-character-name').empty();
    $('#display-bio').empty();
    $('#information').hide();

    $('#display-character-name').html(characterName);
    $('#display-bio').html(results);
    $('#information').show();

  });
}

//Giphy Search Function
function theSearch() {
  var characterName = $(this).attr("data-character");

  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + characterName + "&api_key=S2WxAN0l1NhiYgOVUn8rPyjLMMlcPbXK&limit=10";
console.log(queryURL);

  $.ajax({
    url: queryURL,
    method: "GET"
  })
    .then(function (response) {
      var results = response.data;

      for (var i = 0; i < results.length; i++) {

        if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
          var gifDiv = $("<div class='item'>");

          var rating = results[i].rating;

          var p = $("<p>").text("Rating: " + rating);

          var characterImage = $("<img>");

          characterImage.attr("src", results[i].images.original_still.url);

          characterImage.attr({
            "data-still": results[i].images.original_still.url,
            "data-animate": results[i].images.original.url,
            "data-state": "still",
            "style": "display: block; margin-left: auto; margin-right: auto; width: 50%;",
            "id": "picture"

          });



          characterImage.addClass("gif");
          gifDiv.append(p);
          gifDiv.append(characterImage);

          $("#gifs-appear-here").prepend(gifDiv);
          $("#picture").on("click", runOrStop);

        }
      }
    });
}

//Play or Pause Gif Function.
function runOrStop() {
  var state = $(this).attr("data-state");

  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
}