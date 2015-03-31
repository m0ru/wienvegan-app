require('./app.tag');
var riot = require('riot');
utils = require('./utils')
mock_data = require('./dummy-data')
RestaurantStore = require('./restaurant-store')


var actions = new (require('./actions.js'))();
global.window.actions = actions; //TODO deletme; for testing
global.window.riot = riot; //TODO deletme; for testing

//require('../node_modules/leaflet/dist/leaflet.css');
//require('../node_modules/riot/riot+compiler.js');
//var riot = require('riot');

SelectedRestaurantStore = require('./selected-restaurant-store')//TODO DELETME; for testing
global.window.selectedRestaurantStore = new SelectedRestaurantStore();


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
    restaurantStore.setRestaurants(mock_data.restaurants);
    console.log("#rest.: ", mock_data.restaurants.length);
}

global.window.restaurantStore = restaurantStore;
global.window.testadoo = function () {
  console.log(restaurantStore.getAll());
  console.log(restaurantStore.get(1));
  console.log("nr of restaurants: " + restaurantStore.getAll().length);

}

riot.update(); // TODO this should not be necessary, but the markers won't appear otherwise
