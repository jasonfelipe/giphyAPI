
//add script to make for loop that creates buttons.




$("button").on("click", function() {
    // In this case, the "this" keyword refers to the button that was clicked
    var game = $(this).attr("data-game");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      game + "&api_key=S2WxAN0l1NhiYgOVUn8rPyjLMMlcPbXK&limit=10";

$.ajax({
    url: queryURL,
    method: "GET"
  })
    // After the data comes back from the API
    .then(function(response) {
      // Storing an array of results in the results variable
      var results = response.data;

      // Looping over every result item
      for (var i = 0; i < results.length; i++) {

        // Only taking action if the photo has an appropriate rating
        if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
          // Creating a div with the class "item"
          var gifDiv = $("<div class='item'>");

          // Storing the result item's rating
          var rating = results[i].rating;

          // Creating a paragraph tag with the result item's rating
          var p = $("<p>").text("Rating: " + rating);

          // Creating an image tag
          var gameImage = $("<img>");

          // Giving the image tag an src attribute of a proprty pulled off the
          // result item
          gameImage.attr("src", results[i].images.fixed_height.url);

          // Appending the paragraph and personImage we created to the "gifDiv" div we created
          gifDiv.append(p);
          gifDiv.append(gameImage);

          // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
          $("#gifs-appear-here").prepend(gifDiv);

        }
    }
  });
});

$('#submit').click(function(e){

    e.preventDefault();

var searchTerm = $('#search-term').val().trim();

var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
searchTerm + "&api_key=S2WxAN0l1NhiYgOVUn8rPyjLMMlcPbXK&limit=10";

//add script to put button.



    })
    
