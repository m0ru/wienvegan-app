require('./leaflet.tag');
require('./restaurant-details.tag');
require('./location-search.tag');
var actions = new (require('./actions.js'))();

<app>
  <section class="screen-sized">
      <!--<div id="location" class="fixed-top">
        <input type="text"
               name="location"
               id="location-search"
               value=""/>
        <button id="locateMeButton">[Current Location!]</button>
      </div>-->
      <location-search></location-search>
      <!--<div id="map" class="fill-parent"></div>-->
      <!--TODO rename tag to include dash -->
      <leaflet></leaflet>
  </section>

  <div id='glass' class="glass fullscreen glass--hidden"></div>

  <restaurant-details
      id="rdetails"
      restaurant="{visibleRestaurant}"
      class="offscreenright
             offscreenright--off">
  </restaurant-details>

  actions.on(actions.RESTAURANT_SELECTED,
    function(restaurantId) {
      /* TODO trigger reflow of map (it should recenter when the viewport-width changes!)*/

      this.glass.classList.remove('glass--hidden')
      this.rdetails.classList.remove('offscreenright--off')
      this.rdetails.classList.add('offscreenright--on')
  }.bind(this));

  //TODO this is quick & dirty. should be toggle in template & rerender? maybe make glass into a tag?
  this.glass.addEventListener('click', function() {
    //console.log('this click', this);
    this.glass.classList.add('glass--hidden')
    this.rdetails.classList.add('offscreenright--off')
    this.rdetails.classList.remove('offscreenright--on')
  }.bind(this));
</app>
