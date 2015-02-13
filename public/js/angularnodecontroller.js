'use strict';

var myApp = angular.module('myApp', []);

myApp.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
]);

/* Controllers */

function UserListCtrl($scope, $http, $templateCache) {
  
  var method = 'POST';
  var inserturl = 'http://127.0.0.1:3001/insertuser';
  $scope.codeStatus = "";
  $scope.save = function() {
    var formData = {
      'username' : this.username,
      'password' : this.password,
	  'email' : this.email
    };
	this.username = '';
	this.password = '';
	this.email = '';
	
	
    var jdata = 'mydata='+JSON.stringify(formData);
	
    $http({
      method: method,
      url: inserturl,
      data:  jdata ,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      cache: $templateCache
    }).
    success(function(response) {
		console.log("success");
        $scope.codeStatus = response.data;
		console.log($scope.codeStatus);
    
    }).
    error(function(response) {
		console.log("error");
        $scope.codeStatus = response || "Request failed";
		console.log($scope.codeStatus);
    });
	$scope.list();
    return false;
  };	

  
  $scope.list = function() {
	  var url = 'http://127.0.0.1:3001/getusers';	
	  $http.get(url).success(function(data) {
		console.log(data);
		//var jsonVar = JSON.parse(data);
		//console.log(jsonVar.length);
		
		$scope.users = data;
		//console.log($scope.users);
		//console.log($scope.users[0]);
		});
  };
  
  $scope.list();
}

