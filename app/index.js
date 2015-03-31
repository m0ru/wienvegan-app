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
SelectedRestaurantStore = require('./selected-restaurant-store')//TODO DELETME; for testing
global.window.selectedRestaurantStore = new SelectedRestaurantStore();

riot.mount('*');

var restaurantStore = new RestaurantStore()
//TODO remove me after server-connection is implemented
if(mock_data && mock_data.restaurants ) {
    restaurantStore.setRestaurants(mock_data.restaurants);
}

riot.update(); // TODO this should not be necessary, but the markers won't appear otherwise
