(function(module) {
  function Stop(latitude, longitude) {
    this.latitude = latitude;
    this.longitude = longitude;
  };

  Stop.prototype.getStopData = function(stop, callback) {
    $.getJSON('/oneBusAway/where/stops-for-location.json?key=TEST'
      + '&lat=' + stop.latitude
      + '&lon=' + stop.longitude
      + '&radius=100',
      function(data, message, xhr) {
        stop.stopsData = data;
        if (callback) callback();
      });
  };

  module.Stop = Stop;
  module.Stop.getStopData = Stop.prototype.getStopData;
})(window);
