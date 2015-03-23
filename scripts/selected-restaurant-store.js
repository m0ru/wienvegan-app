//TODO require('riot')
module.exports = SelectedRestaurantStore
function SelectedRestaurantStore() {
  if ( arguments.callee._singletonInstance )
    return arguments.callee._singletonInstance;
  arguments.callee._singletonInstance = this;

  // Make instances observable
  riot.observable(this)

  var CHANGE_EVENT = 'change_event'
  var _restaurant = {}

  this.set = function(r) {
    _restaurant = r;
    this.emitChange()
  }
  this.get = function() {
    return _restaurant
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
