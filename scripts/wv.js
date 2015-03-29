mock_data = require('./dummy-data')
RestaurantStore = require('./restaurant-store')
SelectedRestaurantStore = require('./selected-restaurant-store')
utils = require('./utils')


var displayedRestaurant = new SelectedRestaurantStore()
var restaurantStore = new RestaurantStore()

//----------------------------------------

// create a map in the "map" div, set the view to a given place and zoom
var map = L.map('map').setView([48.19803, 16.35466], 13);

// add an OpenStreetMap tile layer
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Mon - Sat 11:00 ~ 21:00. Barnabitengasse 6, 1060 Vienna, Austria Tel: + 43 1 581 1112, + 43 699 1920 4294 email: shop@formosa.at

//----------------------------------------



// TODO http://tympanus.net/Development/SidebarTransitions/
//TODO remove global. change to tag and register listener in js
global.window.visibleRestaurant = {}
var rDetails = document.getElementsByTagName('restaurant-details')[0]
var glass = document.getElementById('offcanvas-glass')
global.window.selectRestaurant = function(restaurantId) {
    //TODO use currentRestaurantStore instead
    global.window.visibleRestaurant =  restaurants = restaurantStore.getAll()[restaurantId];

    //TODO hacky (need to limit the update scope)
    // without the update the options aren't passed again
    // use displayedRestaurantStore within the .tag, to automatically update only that tag
    riot.update();

    global.window.openDetails();
}
global.window.openDetails  = function() {
  if(rDetails && glass) {
    /* TODO trigger reflow of map (it recenters when the viewport-width changes!)*/

    glass.classList.remove('glass--hidden')
    rDetails.classList.remove('offscreenright--off')
    rDetails.classList.add('offscreenright--on')
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


//--- restaurant-markers to map ----------

var markers = [];
restaurantStore.addChangeListener(function(){
  // TODO find a way to do react/riot style diffing (instead of readding a lot of markers)
  // remove all current markers
  for (var i = 0; i < markers.length; i++) {
    map.removeLayer(markers[i]);
  }
  markers = [];

  var restaurants = restaurantStore.getAll();
  // console.log(JSON.stringify(restaurants))
  //TODO efficient diffing: check for new indices or updated positions or updated texts or....
  for (var key in restaurants) {
    if (restaurants.hasOwnProperty(key)) {
      var r = restaurants[key];
      console.log(key + " -> " + JSON.stringify(r));
      var m = L.marker([r.lat, r.lon]);
      var popupText = '<a onclick="selectRestaurant(' + key + ')" href="javascript:void(0)"><strong>' +
        r.name  + '</strong></a>'
      m.bindPopup(popupText);
      //m.addTo(map).bindPopup(popupText).openPopup();
      markers.push(m);
      map.addLayer(m);
    }
  }
});


// TODO STOPPED HERE! <<<<<<<<<<<<<<<<<<<<<<<<<<<<<------------------
// via prototypical inheritance:
// * (Abstract)Store
//    * ObjectStore
//    * ArrayStore
// TODO leave restaurant store as object with increasing id's or as array?

//----------------------------------------

//TODO not very pure to just append it to all objects.
// Might lead to obscure control flow.
// It's a hack anyway, till the restaurants come with
// lat/lon already initialized.
function addLatLon(restaurant) {
    var adr = utils.austrianAddressString(restaurant);
    //TODO counter reference will cause problems
    return utils.searchNominatim(adr).then(function(results){
      restaurant.lat = +results[0].lat;
      restaurant.lon = +results[0].lon;
      return restaurant;
    });
}

//TODO remove me after server-connection is implemented
if(mock_data && mock_data.restaurants) {
    //TODO get lon/lat for all restaurants
    // dispatch the requests, wait for all to resolve via .all()

    /*var requests = [];
    for(var i = 0; i < mock_data.restaurants.length; i++) {
      var r = mock_data.restaurants[i];
      requests[i] = addLatLon(r);
    }*/

    //polyfill for Array.prototype.map:
    //https://developer.mozilla.org/en-US/docs/Web/
    //  JavaScript/Reference/Global_Objects/Array/map#Polyfill
    var requests = mock_data.restaurants.map(addLatLon);
    Promise.all(requests).then(
      function(updatedRestaurants) {
        // all have lat/lon now
        restaurantStore.setRestaurants(mock_data.restaurants);
      },
      function(err) {
        // TODO hack
        // TODO the better behaviour would be to only add
        //   those that worked (but client side lat/lon is a
        //   quick-fix anyway, so whatever)

        // one or more failed
        restaurantStore.setRestaurants(mock_data.restaurants);
        console.error("Add least one restaurant doesn't have latitude / longtitude as the address resolution service could not be reached. " + err);
      }
    )
}

//TODO move to utils and change to use promises
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
