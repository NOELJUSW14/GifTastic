//On click eventListener
$(document).ready(function () {

    var btnContainer = ['chicken'];

    //button creator from user submit
    function renderBtn() {
        $('#btnContainer').empty()
        for (var i = 0; i < btnContainer.length; i++) {
            var newGifBtn = $('<button>');
            newGifBtn.addClass('gif-button');
            newGifBtn.attr('data-name', btnContainer[i]);//probably need to change array
            newGifBtn.text(btnContainer[i]);
            $('#btnContainer').append(newGifBtn)

        }
    }
    //Add button from request
    function addButton() {
        $('#requestBtn').on('click', function (event) {
            var queryItem = $('#image-request').val().trim();
            if (queryItem == "") {
                return false;
                // added so user cannot add a blank button

            }
            //push request into array
            btnContainer.push(queryItem);
            console.log(btnContainer)

            renderBtn();
            return false;
            //}  
        })
    }

    //----------------event.preventDefault();

    function getGif() {//1

        // var queryItem = $('#image-request').val().trim();
        var queryItem = $(this).attr("data-name")
        console.log(queryItem)
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + queryItem + "&api_key=dc6zaTOxFJmzC&limit=10";
        // Here we run our AJAX call to the Giphy API
        $.ajax({//2
            url: queryURL,
            method: "GET"
        })//2
            // We store all of the retrieved data inside of an object called "response"
            .then(function (data) {//3
                // Log the resulting object in the console
                console.log(data);
                //$("#image-container").text(JSON.stringify(data));
                $('#image-container').empty();
                var response = data.data;
                if (response == "") {//4
                    alert('No can do!')
                }//4
                for (var i = 0; i < response.length; i++) {//5
                    var newGiphy = $('<div>')
                    newGiphy.addClass('gifDiv');
                    var giphyRating = $('<p>').text('Rating:' + response[i].rating);
                    newGiphy.append(giphyRating);
                    var gifImage = $('<img>');
                    gifImage.attr("src", response[i].images.fixed_height_small_still.url);
                    gifImage.attr("data-still", response[i].images.fixed_height_small_still.url);
                    gifImage.attr("data-animate", response[i].images.fixed_height_small.url);
                    gifImage.attr("data-state", "still");
                    gifImage.addClass("image");
                    newGiphy.append(gifImage);

                    $("#image-container").append(newGiphy);
                }//5
            })//3



    }//1
    //----------------------------------------------------------------------------->
    //
    //----------------------------------------------------------------------------->
    renderBtn();
    addButton();
    removeBtn();

    $(document).on("click", ".gif-button", getGif);
    $(document).on("click", ".image", function () {
        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    });


})


//})



//--------------------------------------------------------------------------------->

//---------------------------------------------------------------------------------->
//Now these buttons have to pull the gif from the API






//link gif button to JSON
//$(document).on('click','#btnContainer',function(){
//URL we need to query the database

    //newImage.attr('alt',response.name)

    // Transfer content to HTML
    //$('#image-conatainer').prepend(newImage)


//})    



//---------------------------------------------------------------------------------------------------------------------->

//Create a button after on click function
