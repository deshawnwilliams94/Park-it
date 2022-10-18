
$(document).ready(function () {
    var map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 44.9537, lng: -93.09 },
        zoom: 14,
    });


    function loadMap() {


        map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: 44.9375, lng: -93.2010 },
            zoom: 14,
        });



        // const uluru = { lat: -25.344, lng: 131.031 };
        // // The map, centered at Uluru
        // const map = new google.maps.Map(document.getElementById("map"), {
        //     zoom: 4,
        //     center: uluru,
        // });
        // // The marker, positioned at Uluru
        // const marker = new google.maps.Marker({
        //     position: uluru,
        //     map: map,
        // });
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
                // var latOne = parseFloat(response.results[0].geometry.location.lat);
                // var lonOne = parseFloat(response.results[0].geometry.location.lng);

                // //  changes map center to searched city, runs functions for restaurants and hotels:
                // map.setCenter({ lat: latOne, lng: lonOne });
                // addParks(latOne, lonOne);

            }
        });

    }




    $("#search-location").on("click", function (event) {
        event.preventDefault();

        var city = $("#map-search").val().trim();
        console.log(city);
        if (city) {
            //initMap(city);
        }
    });



})