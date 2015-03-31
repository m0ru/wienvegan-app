/*
* This is the central action hub for the wv-app. You
* can any user interaction should trigger an event
* here, that causes the stores to update.
*
* Usage:
* to listen: actions.on(action, callback)
* to call action: actions.trigger(action, callbackArgs)
*/
module.exports = function() {
  if ( arguments.callee._singletonInstance )
    return arguments.callee._singletonInstance;
  arguments.callee._singletonInstance = this;  // Make instances observable  riot.observable(this);  this.RESTAURANT_SELECTED = "restaurant-selected";  //TODO Use a proper dispatcher (e.g. fb-flux is only 10kB)}