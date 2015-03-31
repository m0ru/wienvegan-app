require('./app.tag');
//var cstmleaflet = require('./cstmleaflet.js');
require('./leaflet.tag');
//require('../node_modules/leaflet/dist/leaflet.css');
//require('../node_modules/riot/riot+compiler.js');
//var riot = require('riot');
utils = require('./utils')
mock_data = require('./dummy-data')
RestaurantStore = require('./restaurant-store')

var riot = require('riot');

riot.mount('*');





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
var restaurantStore = new RestaurantStore()
//TODO remove me after server-connection is implemented
if(mock_data && mock_data.restaurants ) {
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
