var loadGoogleMapsApi = require('load-google-maps-api-2');
loadGoogleMapsApi.key = 'AIzaSyDMF8bus_g_m9frZBqEWwI6cNEmfXVK4qM';

loadGoogleMapsApi().then(function (googleMaps) {
    var latlng = {lat: 45.5506509, lng: -122.6624718};
    var map = new google.maps.Map(document.getElementById('googlemap'), {
        zoom: 10,
        scrollwheel: false,
        center: latlng
    });
    var marker = new google.maps.Marker({
        position: latlng,
        map: map
    });
}).catch(function (err) {
    console.error(err);
});