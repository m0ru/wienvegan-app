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