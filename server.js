var requestProxy = require('express-request-proxy'),
  express = require('express'),
  port = process.env.PORT || 3000,
  apiKey = process.env.ONEBUS_KEY || 'TEST',
  app = express();

var insertKey = function(request, response) {
  (function() {
    request.params[0] = request.params[0].replace('TEST', '?key=' + apiKey);
    console.log('insertKey >> ' + request.params[0]);
  })(request, response);
  proxyOneBusAway(request, response);
};

var proxyOneBusAway = function(request, response) {
  console.log('Routing OneBusAway request for', request.params[0]);
  //console.log(request);
  (requestProxy({
    url: 'http://api.pugetsound.onebusaway.org/api/' + request.params[0]
  }))(request, response);
};

app.get('/oneBusAway/*', insertKey);

app.use(express.static('./'));

app.get('*', function(request, response) {
  console.log('New request:', request.url);
  response.sendFile('index.html', { root: '.' });
});

app.listen(port, function() {
  console.log('Server started on port ' + port + '!');
});
