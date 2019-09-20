var topics = ["Dogs", "Cats", "Turtle", "Alpaca"];

function renderButtons() {

    $("#btn-sect").empty();
    for (var i = 0; i < topics.length; i++) {

        var btn = $("<button>");
        btn.text(topics[i]);
        btn.attr("id", topics[i]);
        btn.attr("topics", topics[i]);
        $("#btn-sect").append(btn);
    }
}

$("#submit-btn").on("click", function(event) {
    event.preventDefault();
    if ($("#user-input").val() !== "") {
        newTopic = $("#user-input").val().trim();
        $("#user-input").val("");
        topics.push(newTopic);
        renderButtons();
    }
})

function showImg() {
    var topicchoice = $(this).attr("topics");
    console.log(topicchoice);

    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=KfgAtbpxw38tVhiJfO8ET62Z3Hbz1ukO&q=" + topicchoice +"&limit=10&offset=0&rating=PG&lang=en";

    $.ajax({
    url: queryURL,
    method: "GET"
    }).then(function(response) {
    // $("#gif-sect").text(JSON.stringify(response));
        console.log(response.data);

        $("#gif-sect").empty();

        var results = response.data;

        for (var t = 0; t < results.length; t++) {

            var imgDiv = $("<div>")
            var r = $("<div>")

            r.text("Rating: " + results[t].rating);

            var resultImage = $("<img>");
            resultImage.attr("src", results[t].images.fixed_height_still.url);
            resultImage.attr("data-state", "still");
            resultImage.attr("img-still", results[t].images.fixed_height_still.url);
            resultImage.attr("img-animate", results[t].images.fixed_height.url);
            resultImage.addClass("gif");

            imgDiv.append(resultImage);
            imgDiv.append("<br>")
            imgDiv.append(r);

            $("#gif-sect").append(imgDiv);
            $("#gif-sect").append("<br>");

            console.log(imgDiv);
        }
   })
}

function still_animate() {

    var state = $(this).attr("data-state");
    var stillUrl = $(this).attr("img-still");
    var animateUrl = $(this).attr("img-animate");
    if (state === "still") {
        $(this).attr("src", animateUrl);
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", stillUrl);
        $(this).attr("data-state", "still");
    }
}

renderButtons()
$(document).on("click", "button", showImg);
$(document).on("click", ".gif", still_animate);