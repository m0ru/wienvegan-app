SelectedRestaurantStore = require('./selected-restaurant-store')
<restaurant-details>
    <a id="detailview" class="anchor"></a>
    <h1 class="tophandle">{r.name}</h1>

    <dl>
        <dt>Address</dt>
        <dd>{r.street} {r.number}, {r.postcode} {r.city}, {r.country}</dd>

        <dt>Tel</dt>
        <dd>+ 43 1 581 1112</dd>

        <dt>Mobile</dt>
        <dd>+ 43 699 1920 4294</dd>

        <dt>Email</dt>
        <dd>shop@formosa.at</dd>

        <dt>Business Hours</dt>
        <!--<dd id='hoursTag'>{hoursTemplate}</dd>-->
        <dd id='hoursTag'></dd>

        <dt>Cuisine/Tags:</dt>
        <dd>Asian, International, Shop</dd>

    </dl>
    <h2>Further Notes:</h2>
    <p> Consetetur sadipscing elitr, causing scrolling behaviour, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. </p>

    var selectedRestaurantStore = new SelectedRestaurantStore();
    selectedRestaurantStore.addChangeListener(function(){
      console.log('rdetails.tag is updating');
      this.update();
    }.bind(this));

    this.on('update', function(){
      this.r = selectedRestaurantStore.get();
      //this.r = this.opts.restaurant
      this.hoursTag.innerHTML = genHoursHTML(this.r.hours)
    });

    var humanReadableWeekday= ['Mon', 'Tue',
      'Wed', 'Thu', 'Fri', 'Sat', 'Son']

    var genHoursHTML = function(hours) {
      // TODO very hacky. find more elegant solution
      //    that works with riot templating
      //    use mustache.js? https://github.com/janl/mustache.js
      // TODO if there are multiple time-slots per day (e.g. if there's a
      //    lunch-break), the day should only show up once. E.g.
      //    Mon: 9:00-12:00, 12:00-20:00
      console.log(JSON.stringify(hours))
      var lines = ''
      if(hours && hours.length > 0) {
        //
        lines = hours.map(function(h) {
          return '<dt>' +
            humanReadableWeekday[h.weekday] +
            '</dt>' +
            '<dd>' + h.start + ' - ' + h.end + '</dd>'
        })
        lines = lines.reduce(function(acc, x, idx, arr) {
          return acc + '\n' + x
        })
        lines = '\n<dl>\n' + lines + '\n</dl>\n'
      }
      return lines
    }

    /*
    var hTag = this.hoursTag
    */

</restaurant-details>
