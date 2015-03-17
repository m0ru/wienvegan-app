//TODO require('riot')
module.exports = RestaurantStore
function RestaurantStore() {
  if ( arguments.callee._singletonInstance )
    return arguments.callee._singletonInstance;
  arguments.callee._singletonInstance = this;

  // Make instances observable
  riot.observable(this)

  var CHANGE_EVENT = 'change_event'
  var _restaurants = {}

  this.setRestaurant = function(r) {
    _restaurants[r.id] = r;
    this.emitChange()
  }
  this.setRestaurants = function(rs) {
    for(var i = 0; i < rs.length; i++) {
      this.setRestaurant(rs[i])
    }
    this.emitChange()
  }
  this.getAll = function() {
    return _restaurants
  }
  this.emitChange = function() {
    this.trigger(CHANGE_EVENT)
  }
  this.addChangeListener = function(callback) {
    this.on(CHANGE_EVENT, callback)
  }
  this.removeChangeListener = function(callback) {
    this.off(CHANGE_EVENT, callback)
  }
}
//var rs = new RestaurantStore()
//rs.trigger(CHANGE_EVENT)
