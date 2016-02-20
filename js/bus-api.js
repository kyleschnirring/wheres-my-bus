(function(module) {
  function Stop(latitude, longitude) {
    this.latitude = latitude;
    this.longitude = longitude;
  };

  Stop.getStopData = function(stop, callback) {
    $.get('/oneBusAway/where/stops-for-location.json'
          + '&lat=' + stop.latitude
          + '&lon=' + stop.longitude
          + '&radius=100')
      .done(function(data, message, xhr) {
        console.log('got here');
        console.log(data);
        stop.stopsData = data;
        if (callback) callback();
      })
      .fail(function(jqxhr, textStatus, error) {
        var err = textStatus + ', ' + error;
        console.log('Request Failed: ' + err);
      });
  };

  Stop.getArrivals = function(stop, callback) {
    var url = '/oneBusAway/where/arrivals-and-departures-for-stop/'
              + stop.stopID
              + '.json';
    $.getJSON(url,
      function(data, message, xhr) {
        stop.arrivalsData = data;
        if (callback) callback();
      });
  };

  module.Stop = Stop;
})(window);
