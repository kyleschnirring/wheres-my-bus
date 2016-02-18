var output = $('#output');
var mapElement = $('#map').get(0);
var stops = {};

if (!Location.checkAvailability) {
  output.html('<p>Geolocation is not supported by your browser</p>');
} else {
  output.html('<p>Locating…</p>');
}

function success(position) {
  var currentLocation = new Location(
    position.coords.latitude,
    position.coords.longitude
  );

  output.html('<p>Latitude: ' + currentLocation.latitude
    + '°<br>Longitude: ' + currentLocation.longitude + '°</p>');

  var map = new google.maps.Map(mapElement, currentLocation.mapOptions);

  var marker = new google.maps.Marker({
    map: map,
    position: currentLocation.position,
    title: 'Your location',
    icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
  });

  stops = new Stop(currentLocation.latitude, currentLocation.longitude);
  Stop.getStopData(stops, renderList);
}

function renderList() {
  var stopsRaw = stops.stopsData.data.list;
  var stopsList = stopsRaw.map(function(element) {
    return '(' + element.direction + ')'
    + ', ' + element.id + ': '
    + element.name;
  });
  console.log(stopsList);
  stopsList.forEach(function(element) {
    $('#stops').append('<li><a href=\"#\">' + element + '</a></li>');
  });
}


  //$('#stops').append(JSON.stringify(stops.stopsData, null, 2));

function error() {
  output.html = '<p>Unable to retrieve your location</p>';
};

navigator.geolocation.getCurrentPosition(success, error);
