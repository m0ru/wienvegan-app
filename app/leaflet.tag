require('leaflet');
RestaurantStore = require('./restaurant-store')

<leaflet>
  <div id="mapcanvas" class="fill-parent"></div>

  // TODO move somewhere else?
  // Leaflet + Webpack/Browserify fix:
  L.Icon.Default.imagePath = '../node_modules/leaflet/dist/images/';

  this.on('mount', function() {
    // create a map in the "map" div, set the v iew to a given place and zoom
    this.map = L.map(this.mapcanvas)
               .setView([48.19803, 16.35466], 13);

    // add an OpenStreetMap tile layer
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    // Force it to adapt to actual size
    // for some reason this doesn't happen by default
    // when the map is within a tag.
    // this.map.invalidateSize();
    // ^ doesn't work (needs to be done manually atm);

    global.window.foomap = this.map; //TODO deleteme; for testing
  });

  // there's a map.locate!!!
  // and fitBounds that fit allow fitting an area
  // eachLayer(m) / hasLayer(m) for diffing?

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

  //--- restaurant-markers to map ----------

  var selectRestaurant = function(id) {
    actions.trigger(actions.RESTAURANT_SELECTED, id);
  }
  global.window.selectRestaurant = selectRestaurant; //TODO quick-fix. Make accessible in popover texts some other way.

  var restaurantStore = new RestaurantStore()
  var markers = [];
  this.on('update', function() {
    //console.log("MAAAAP", map);
    /*console.log("this", this);
    console.log("MAAAAPC", this.mapcanvas);
    console.log("MAAAAP", this.map);*/
    // TODO find a way to do react/riot style diffing (instead of readding a lot of markers)
    // remove all current markers
    for (var i = 0; i < markers.length; i++) {
      this.map.removeLayer(markers[i]);
    }
    markers = [];

    var restaurants = restaurantStore.getAll();
    // console.log(JSON.stringify(restaurants))
    //TODO efficient diffing: check for new indices
    //     or updated positions or updated texts or....
    for (var key in restaurants) {
      if (restaurants.hasOwnProperty(key)) {
        var r = restaurants[key];
        //console.log(key + " -> " + JSON.stringify(r));
        var m = L.marker([r.lat, r.lon]);
        //console.log(key + " -> ", m);
        var popupText = '<a onclick="selectRestaurant(' + key + ')" href="javascript:void(0)"><strong>' +
          r.name  + '</strong></a>'
        m.bindPopup(popupText);
        markers.push(m);
        this.map.addLayer(m);
      }
    }
  });

</leaflet>
