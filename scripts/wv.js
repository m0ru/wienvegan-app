mock_data = require('./dummy-data')
RestaurantStore = require('./restaurant-store')

//----------------------------------------

// create a map in the "map" div, set the view to a given place and zoom
var map = L.map('map').setView([48.19803, 16.35466], 13);

// add an OpenStreetMap tile layer
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var popupText = '<a onclick="openDetails()" href="javascript:void(0)"><strong>Formosa Food</strong><br>Asian, International, Shop</a>'

// add a marker in the given location, attach some popup content to it and open the popup
L.marker([48.19803, 16.35466]).addTo(map)
    .bindPopup(popupText)
    .openPopup();
// Mon - Sat 11:00 ~ 21:00. Barnabitengasse 6, 1060 Vienna, Austria Tel: + 43 1 581 1112, + 43 699 1920 4294 email: shop@formosa.at

//----------------------------------------

// TODO http://tympanus.net/Development/SidebarTransitions/
//TODO remove global. change to tag and register listener in js
global.window.visibleRestaurant = {}
var rDetails = document.getElementsByTagName('restaurant-details')[0]
var glass = document.getElementById('offcanvas-glass')
global.window.openDetails  = function() {
  if(rDetails && glass) {
    /* TODO trigger reflow of map (it recenters when the viewport-width changes!)*/

    glass.classList.remove('glass--hidden')
    rDetails.classList.remove('offscreenright--off')
    rDetails.classList.add('offscreenright--on')

    global.window.visibleRestaurant = mock_data.restaurants[0] //TODO change to clicked restaurant
    riot.update() //TODO hacky (need to limit the update scope)
    // without the update the options aren't passed again
  }
}

global.window.closeDetails = function() {
  if(rDetails && glass) {
    glass.classList.add('glass--hidden')
    rDetails.classList.add('offscreenright--off')
    rDetails.classList.remove('offscreenright--on')
    global.window.visibleRestaurant = {}
  }
}

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

var locateMeButton = document.getElementById("locateMeButton");
var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};
var drawLocation = function(position) {
    console.log("in navigator");
    locateMeButton.innerHTML = "[Current Location!]"; //TODO
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;

    L.marker([lat, lon]).addTo(map)
        .bindPopup('Your current position.')
        .openPopup();
};
var printGeolocationError = function(err) {
  locateMeButton.innerHTML = "[Current Location!]"; //TODO
  if(err.code == 1) {
    alert("If you want to show your position, please try again and click 'accept'");
  } else if( err.code == 2) {
    alert("Position is unavailable!");
  }

};
function locateMe() {
  // TODO need to explicitely enable tracking for the site in chrome. not even an indicator in ff :|
  // TODO add as 'locate-me'-icon-button next to or in the search field
  if ("geolocation" in navigator) {

    console.log("in locateMe if");
    locateMeButton.innerHTML = "[homing in]" //TODO set spinner
    navigator.geolocation.getCurrentPosition(drawLocation, printGeolocationError, options);
  } else {
      alert("Sorry, your browser does not support geolocation! ")
  }
}
locateMeButton.addEventListener("click", locateMe);

//global.window.locateMe();
//----------------------------------------

var rStore = new RestaurantStore()

//TODO remove me after server-connection is implemented
if(mock_data && mock_data.restaurants) {
    rStore.setRestaurants(mock_data.restaurants)
}

function httpGetJson(url, cb) {
    var req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.onreadystatechange = function (resp) {
        var rs = JSON.parse(this.responseText);
        cb(rs);
    }
    req.send(null);
}
function getRestaurants() {
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
}
//getRestaurants()

//----------------------------------------
