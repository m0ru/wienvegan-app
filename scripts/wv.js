var riot = require('riot');
mock_data = require('./dummy-data')
RestaurantStore = require('./restaurant-store')
SelectedRestaurantStore = require('./selected-restaurant-store')
utils = require('./utils')




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


// TODO STOPPED HERE! <<<<<<<<<<<<<<<<<<<<<<<<<<<<<------------------
// via prototypical inheritance:
// * (Abstract)Store
//    * ObjectStore
//    * ArrayStore
// TODO leave restaurant store as object with increasing id's or as array?


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
