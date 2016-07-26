var express = require('express');
var OpenedCaptions = require('opened-captions');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);


app.use(express.static(__dirname + '/public'));

// Start web server 
var port = process.env.PORT || 3000;
server.listen(port, function(){
	console.log("we're ready to roll!")
});

var oc = new OpenedCaptions({ io: io }); 

oc.addStream('server', {
  host: 'https://openedcaptions.com',
  port: 443,
  description: "CSPAN"
});