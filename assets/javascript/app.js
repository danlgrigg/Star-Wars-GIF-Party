// Adding click event listen listener to all buttons
$("button").on("click", function() {

    
    // Grabbing and storing the data-animal property value from the button
    var movie = $(this).attr("data-movie");
    
    //This is the URL of the API giphy site; query url for giphy random cat gif
    var queryURL = "https://api.giphy.com/v1/gifs/random?q" + movie + "api_key=rrsHLSDYV10yR06OnQTn0nq8M0rLxZHN&limit=10";

    // Performing an AJAX request with the queryURL
    $.ajax({
        url: queryURL,
        method: "GET"
    });

    // After data comes back from the request
    .then(function(response) {
        console.log(queryURL);
        console.log(response);
    }
});