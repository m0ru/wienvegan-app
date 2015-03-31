require('./name.tag');
require('./leaflet.tag');
require('./restaurant-details.tag');
var actions = new (require('./actions.js'))();

<app>
  <name first="Hello" last="World"></name>
  <name first="Ola" last="Mundo"></name>

  <section class="screen-sized">
      <div id="location" class="fixed-top">
        <input type="text"
               name="location"
               id="location-search"
               value=""/>
        <button id="locateMeButton">[Current Location!]</button>
      </div>
      <!--<div id="map" class="fill-parent"></div>-->
      <leaflet></leaflet>
  </section>

  <div id='glass' class="glass fullscreen glass--hidden" onclick='closeDetails()'></div>

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

  this.glass.addEventListener('click', function() {
    //console.log('this click', this);
    this.glass.classList.add('glass--hidden')
    this.rdetails.classList.add('offscreenright--off')
    this.rdetails.classList.remove('offscreenright--on')
  }.bind(this));
</app>
