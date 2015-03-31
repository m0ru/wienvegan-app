//TODO is it bad style to declare the functions in the exports object instead of just closure-binding them in? (e.g. search needs to us *this*.get)
module.exports = {
  /* based on the js from http://mdn.github.io/promises-test/ */
  get : function(url) {
    return new Promise(function(resolve, reject) {
      var req = new XMLHttpRequest();
      req.open("GET", url, true);
      req.onload = function() {
        if(req.status === 200) {
          resolve(req.response);
        } else {
          reject(Error("GET to " +
            url + " failed with: " + req.statusText));
        }
      }
      req.onerror = function() {
        // Also deal with the case when the entire
        // request fails to begin with. This is probably
        // a network error, so reject the promise with
        // an appropriate message
         reject(Error('There was a network error.'));
      }
      req.send();
   });
  },

  /* Searches the nominatim address-lookup service and
   * returns a list with the search results.
   */
  searchNominatim : function(searchStr) {
    var url = "http://nominatim.openstreetmap.org/search/" +
        encodeURIComponent(searchStr) + "?format=json";
    console.log("About to query: " + url);
    return this.get(url).then(function(resp){
      return JSON.parse(resp);
    });
  },

  /*
   * Constructs an austrian-style  address string from
   * the restaurant's seperated address component fields.
   * The string then is suited for display or * querying nominatim.
   */
  austrianAddressString: function(restaurant) {
    var r = restaurant;
    return r.street + " " + r.number + ", " +
      r.postcode + " " + r.city + ", " + r.country;
  }

}
