function genHoursTemplate(hours) {
  // TODO very hacky. find more elegant solution
  // that works with riot templating
  // use mustache.js? https://github.com/janl/mustache.js
  console.log(JSON.stringify(hours))
  var lines = ''
  if(hours) {
    var printedWeekDay = -1
    //for(var i = 0; i < hours.size; i++) {
    for(var i = 0; i < hours.length; i++) { // TODO causes "not well-formed" if it's in the .tag file
      var h = hours[i];
      // append each weekday only once
      if(printedWeekDay < h.weekday) {
        printedWeekDay = h.weekday
        lines = lines + '\n<dt>' +
          humanReadableWeekday[h.weekday] +
          '</dt>\n'
      }
      lines = lines + '<dd>' +
        h.start + ' - ' + h.end +
        '</dd>\n'
    }
    lines = '\n<dl>\n' + lines + '\n</dl>\n'
  }
  return lines
}console.log('foooooo')module.exports = genHoursTemplate