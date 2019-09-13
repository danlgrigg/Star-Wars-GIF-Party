$(document).ready(function() {
  var characterArray = [
    "Han Solo",
    "Yoda",
    "Obi-Wan Kenobi",
    "Gen. Leia Organa",
    "Jar-Jar Binx",
    "Kylo Ren",
    "Jabba the Hut"
  ];
  for (let i = 0; i < characterArray.length; i++) {
    var movie = characterArray[i];
    var movieButton = $("<button>");
    movieButton.text(movie);
    movieButton.attr("id", "movie-btn");
    movieButton.attr("class", "btn btn-danger m-1");
    $("#buttons-display").prepend(movieButton);
  }

  $("#button-addon1").on("click", function() {
    var buttonTitle = $("#button-title-input").val();
    var newButton = $("<button>");
    newButton.text(buttonTitle);
    newButton.attr("id", "movie-btn");
    newButton.attr("class", "btn btn-danger m-1");
    $("#buttons-display").append(newButton);
    $("#button-title-input").val("");


  });
  // Adding click event listener to all buttons
  $("#buttons-display").on("click", "#movie-btn", function() {
    $("#gif-display").empty();
    var movieTitle = $(this).text();
    // Grabbing and storing the movie property value from the button
    //This is the URL of the API giphy site; query url for giphy random cat gif
    var queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      movieTitle +
      "&api_key=rrsHLSDYV10yR06OnQTn0nq8M0rLxZHN&rating=PG-13&limit=10";

    // Perform a request to pull data from API
    $.ajax({
      url: queryURL,
      method: "GET"
    })
        
      // After data comes back from the request, cycle through each object to pull values for image, rating
      .then(function(response) {
        for (let i = 0; i < response.data.length; i++) {
          var gif = response.data[i];
          var gifStill = gif.images.fixed_height_still.url;
          var gifAnimate = gif.images.fixed_height.url;
          var gifDiv = $(

            `<div class="card m-3" style="width: 18rem;">` +
              `<img src="${gifStill}" class="card-img-top gif" data-state="still" data-still="${gifStill}" data-animate="${gifAnimate}" alt="...">` +
              '<div class="card-body-danger">' +
              '<p class="card-text">' + 'Rating: ' +
              gif.rating +
              "</p>" +
              "</div>"
          );
          $("#gif-display").append(gifDiv);

          // create click event to animate and still gifs
          $(".gif").on("click", function() {
            var state = $(this).attr("data-state");
            
            if (state === "still") {
              $(this).attr("src", $(this).attr("data-animate"));
              $(this).attr("data-state", "animate");
            } else {
              $(this).attr("src", $(this).attr("data-still"));
              $(this).attr("data-state", "still");
            }
          });
        }
      });
  });
});
