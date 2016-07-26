var socket = require('socket.io-client')('https://openedcaptions.com:443');
socket.on('connect', function(){
  console.log("bobobobobo")
});

socket.on('event', function(data){
  console.log(data);
  
});
socket.on('disconnect', function(){});

socket.on('connect_error', function(err){
  console.log(err);
})