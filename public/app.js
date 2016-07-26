angular.module("app", [])
.controller("controller", ["$scope", "$http", "$sce", function($scope, $http, $sce){

  $scope.renderHTML = function(text){ return $sce.trustAsHtml(text); };

  var socket = io();
  $scope.transcript = [];
  
  $scope.text = "";
  var sentence = "";
  var time = moment().format("h:mm a, MMM. D");
  var speaker = "Unknown";


  socket.on('word', function(data) {
    var word = data.data.body;
    console.log( word );
    
    $scope.$apply(function(){
      // If we reach a chevron start a new section block
      if( word.indexOf(">>") != -1 ){
        $scope.transcript.unshift({ speaker: speaker, time: time, text: $scope.text });
        $scope.text = "";
        time = moment().format("H:mm a, MMM. D");
        console.log($scope.transcript);
      }
      else if( word.indexOf(":") != -1){
        $scope.text = $scope.text + "<strong>" + sentence + word + "</strong> ";
        sentence = ""
      }
      else if( word.indexOf(".") != -1 || word.indexOf("?") != -1 || word.indexOf("!") != -1 ){
        sentence = sentence + data.data.body + " ";

        $scope.text = $scope.text + capitalizeFirstLetter(sentence.toLowerCase()); + " ";
        sentence = "";
      }
      else {
        sentence = sentence + word + " ";
      }
    });
  });
  
}]);

// Thanks http://stackoverflow.com/questions/1026069/capitalize-the-first-letter-of-string-in-javascript
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}