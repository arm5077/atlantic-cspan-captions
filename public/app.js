angular.module("app", [])
.controller("controller", ["$scope", "$http", "$sce", function($scope, $http, $sce){
  var socket = io();

  socket.on('word', function(data) {
    console.log("bobobobo");
    console.log(data.data.body);
    words = words + data.data.body + " ";
  });

	
}]);