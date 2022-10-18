
$(document).ready(function () {
    var map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 44.9537, lng: -93.09 },
        zoom: 14,
    });
    var history = JSON.parse(localStorage.getItem("history")) || []
    for (var i = 0; i < history.length; i++) {
        var newButton = $("<button>")
        newButton.text(history[i])
        $("#history").append(newButton)
        newButton.on("click", function (event) {
            initMap(event.target.textcontent);
        })


    }

    function loadMap() {


        map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: 44.9375, lng: -93.2010 },
            zoom: 14,
        });




    }

    function addParks(latOne, lonOne) {
        var request2 = {
            location: new google.maps.LatLng(latOne, lonOne),
            radius: 10000,
            type: ["park"],
        };

        var service = new google.maps.places.PlacesService(map);
        service.nearbySearch(request2, function (results, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {


                console.log("Nearby Parks: ", results)
                for (var i = 0; i < 10; i++) {

                    //if results are not available i.e there is not photo for a listing, moves on to the next listing.
                    if (
                        !results[i] ||
                        !results[i].photos ||
                        !results[i].name ||
                        !results[i].place_id ||
                        !results[i].rating ||
                        !results[i].vicinity
                    ) {
                        continue;
                    }
                    let name = results[i].name;
                    let placeID = results[i].place_id;
                    let photo = results[i].photos[0].getUrl;
                    let rating = results[i].rating;
                    let address = results[i].vicinity;



                    const contentString =
                        '<div id="content">' +
                        '<div id="siteNotice">' +
                        "</div>" +
                        '<h1 id="firstHeading" class="firstHeading">' + name + '</h1>' +
                        '<div id="bodyContent">' +
                        "</div>" +
                        "</div>";

                    const infowindow = new google.maps.InfoWindow({
                        content: contentString,
                    });

                    //create markers on map
                    var marker = new google.maps.Marker({
                        place: {
                            placeId: placeID,
                            location: results[i].geometry.location,
                        },
                        title: name,
                        icon: {
                            url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
                        },
                    });
                    marker.addListener("click", () => {
                        infowindow.open({
                            anchor: marker,
                            map,
                            ariaLabel: "Uluru",
                        });
                    });
                    marker.setMap(map);
                }
                map.setCenter(results[0].geometry.location);
            }
        });
    }




    function initMap(city) {
        geolocateURL =
            "https://maps.googleapis.com/maps/api/geocode/json?address=" +
            city +
            "&key=AIzaSyBB7PAcbtKLE1mCFRaPC3f9HmUUBuW6LZg";

        // AJAX call for geolocate 
        $.ajax({
            url: geolocateURL,
            method: "GET",
            error: function (xhr, status, error) {
                var errorMessage = xhr.status + ": " + xhr.statusText;
                alert("Error - " + errorMessage);
            },
            success: function (response) {
                //setting the variables for longitude and latitude to plug in to line 25 to center:
                var latOne = parseFloat(response.results[0].geometry.location.lat);
                var lonOne = parseFloat(response.results[0].geometry.location.lng);
                console.log(latOne)
                console.log(lonOne)
                // //  changes map center to searched city, runs functions for restaurants and hotels:
                map = new google.maps.Map(document.getElementById("map"), {
                    center: { lat: 44.9537, lng: -93.09 },
                    zoom: 14,
                });
                map.setCenter({ lat: latOne, lng: lonOne });
                addParks(latOne, lonOne);

            }
        });

    }

    function parkHistory(city) {
        history.push(city)
        localStorage.setItem("history", JSON.stringify(history))

        var newButton = $("<button>")
        newButton.text(city)
        $("#history").append(newButton)
        newButton.on("click", function () {
            initMap(city);
        })
    }



    $("#search-form").on("submit", function (event) {
        event.preventDefault();

        var city = $("#map-search").val().trim();
        console.log(city);
        if (city) {
            parkHistory(city)
            initMap(city);
        }
    });



})