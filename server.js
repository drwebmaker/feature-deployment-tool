var express = require('express');
var app = express();
var projectDir = '/public';

app.configure(function(){
  var folder = 'PhantomJS 1.9.7 (Mac OS X)';

  if ('linux' === process.platform) {
    folder = 'PhantomJS 1.9.7 (Linux)';
  }

  app.use('/report', express.static(__dirname + '/build/coverage/' + folder + '/'));
  app.use('/css', express.static(__dirname + projectDir + '/css'));
  app.use('/images', express.static(__dirname + projectDir + '/images'));
  app.use('/javascript', express.static(__dirname + projectDir + '/javascript'));

  app.use(express.bodyParser());
  app.use(require('method-override')());
});

app.all('/*', function(req, res) {
  var fullPath = req.host + req.path;

  if (!fullPath.match(/deployment\.lvh\.me/)) {
    return res.redirect('http://deployment.lvh.me:3000', 302);
  }

  res.sendfile('index.html', { root: __dirname + projectDir });
});

module.exports = app;
