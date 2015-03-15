//----------------------------------------

// create a map in the "map" div, set the view to a given place and zoom
var map = L.map('map').setView([48.19803, 16.35466], 13);

// add an OpenStreetMap tile layer
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var popupText = '<a href="#detailview"><strong>Formosa Food</strong><br>Asian, International, Shop</a>'

// add a marker in the given location, attach some popup content to it and open the popup
L.marker([48.19803, 16.35466]).addTo(map)
    .bindPopup(popupText)
    .openPopup();
// Mon - Sat 11:00 ~ 21:00. Barnabitengasse 6, 1060 Vienna, Austria Tel: + 43 1 581 1112, + 43 699 1920 4294 email: shop@formosa.at

//----------------------------------------

    /*
    data-format: GeoJSON
    plugins:
        * static labels: https://github.com/Leaflet/Leaflet.label
        * marker clustering: https://github.com/Leaflet/Leaflet.markercluster
        * marker clustering: https://github.com/SINTEF-9012/PruneCluster
        * searching: http://leafletjs.com/plugins.html#geocoding-address-lookup
        * route-planing: https://github.com/Turistforeningen/leaflet-routing
        * 2-finger-zoom: https://github.com/aratcliffe/Leaflet.twofingerzoom
        * zoomslider: http://kartena.github.io/Leaflet.zoomslider/
        * internationalisation: https://github.com/yohanboniface/Leaflet.i18n

        * sidebar: https://github.com/turbo87/leaflet-sidebar/
    */


//----------------------------------------

// TODO need to explicitely enable tracking for the site in chrome. not even an indicator in ff :|
if ("geolocation" in navigator) {
    /* geolocation is available */
    navigator.geolocation.getCurrentPosition(function(position) {
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;

        L.marker([lat, lon]).addTo(map)
            .bindPopup('Your current position.')
            .openPopup();
    });
} else {
    /* geolocation IS NOT available */
}

//----------------------------------------

function httpGetJson(url, cb) {
    var req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.onreadystatechange = function (resp) {
        var rs = JSON.parse(this.responseText);
        cb(rs);
    }
    req.send(null);
}
httpGetJson("http://dev.onetrix.net:8000/wv/json", function(resp) {
  var rs = resp.d;

  for(var i = 0; i < rs.length; i++) {
    var r = rs[i];
    var searchstr = "http://nominatim.openstreetmap.org/search/" +
      r.street + " " + r.number + ", " +
      r.city + ", " + r.country +
      "?format=json";
    searchstr = encodeURI(searchstr);
    /*console.log(searchstr);*/
    httpGetJson(searchstr, function(resp) {
        var best = resp[0];
        //TODO r: reference only contains last bound in loop
        console.log(r.name, " ", best.lat, " ", best.lon);

    });
  }
});

//----------------------------------------
