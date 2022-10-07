

function initMap() {


    var map = new google.maps.Map(document.getElementById("map"), {
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

window.initMap = initMap;


