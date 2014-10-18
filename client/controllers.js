var myApp = angular.module('myApp',[]);

myApp.controller('Controller', ['$scope', '$http', function($scope, $http) {
	$scope.groups = [
		{
			name: "Family",
			id: 1,
			newTasks: 1
		}, 
		{
			name: "Roommates",
			id: 2,
			newTasks: 0
		}, 
		{
			name: "Knitting Club",
			id: 3,
			newTasks: 2
		},
		{
			name: "Fight Club",
			id: 4,
			newTasks: 7
		}
	];

	$scope.tasks = [
		{
			name: "PICK UP YOUR SHIT",
			comments: [
				{
					text: "make me",
					author: "Joe"
				}
			],
			owner: "Joe",
			time: 0 
		},
		{
			name: "do the laundry, bitch",
			comments: [
				{
					text: "I'M AN ADULT",
					author: "Jim"
				}
			],
			owner: "Jim",
			time: 0 
		}
	];

	var baseAPIUrl = "http://aqueous-earth-8550.herokuapp.com";

	$scope.facebookLogin = function() {
		$http.get(baseAPIUrl + "/auth/facebook").
			success(function(data, status, headers, config) {
	    // this callback will be called asynchronously
	    // when the response is available
	    getGroups(function() {
	    	// TODO: get user name and redirect to groups page
	    });
	  }).
	  error(function(data, status, headers, config) {
	    // called asynchronously if an error occurs
	    // or server returns response with an error status.
	  });
	}

	function getGroups(callback) {
		$http.get(baseAPIUrl + "/groups").
			success(function(data, status, headers, config) {
	    // this callback will be called asynchronously
	    // when the response is available
	    $scope.groups = data;
	    callback();
	  }).
	  error(function(data, status, headers, config) {
	    // called asynchronously if an error occurs
	    // or server returns response with an error status.
	  });
	}
}]);