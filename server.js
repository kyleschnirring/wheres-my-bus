var requestProxy = require('express-request-proxy'),
  express = require('express'),
  port = process.env.PORT || 3000,
  apiKey = process.env.ONEBUS_KEY,
  apiUrl = '',
  app = express();

var proxyOneBusAway = function(request, response) {
  console.log('API_KEY: ' + apiKey);
  console.log('REQ_PARAMS: ' + request.params[0]);
  apiUrl
  (requestProxy({
    url: 'http://api.pugetsound.onebusaway.org/api/'
         + request.params[0]
  }))(request, response);
};

app.get('/oneBusAway/*', proxyOneBusAway);

app.use(express.static('./'));

app.get('*', function(request, response) {
  console.log('New request:', request.url);
  response.sendFile('index.html', { root: '.' });
});

app.listen(port, function() {
  console.log('Server started on port ' + port + '!');
});
