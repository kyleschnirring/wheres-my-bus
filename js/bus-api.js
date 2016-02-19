(function(module) {
  function Stop(latitude, longitude) {
    this.latitude = latitude;
    this.longitude = longitude;
  };

  Stop.prototype.getStopData = function(stop, callback) {
    $.getJSON('/oneBusAway/where/stops-for-location.jsonTEST'
              + '&lat=' + stop.latitude
              + '&lon=' + stop.longitude
              + '&radius=100',
      function(data, message, xhr) {
        stop.stopsData = data;
        if (callback) callback();
      });
  };

  Stop.prototype.getArrivals = function(stop, callback) {
    var apiUrl = '/oneBusAway/where/arrivals-and-departures-for-stop/'
                 + stop.stopID
                 + '.jsonTEST';
    $.getJSON(apiUrl,
      function(data, message, xhr) {
        stop.arrivalsData = data;
        if (callback) callback();
      });
  };

  module.Stop = Stop;
  module.Stop.getStopData = Stop.prototype.getStopData;
  module.Stop.getArrivals = Stop.prototype.getArrivals;
})(window);
