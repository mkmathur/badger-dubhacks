var myApp = angular.module('myApp',[]);

myApp.controller('Controller', ['$scope', '$http', '$location', function($scope, $http, $location) {
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
			time: 0,
			id: 1
		},
		{
			name: "Feed your  tummy",
			comments: [
				{
					text: "I refuse",
					author: "Jackp"
				}
			],
			owner: "Jackp",
				time: 0,
				id: 1
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
			time: 0,
			id: 2
		}
	];

	var baseAPIUrl = "http://aqueous-earth-8550.herokuapp.com";

	function getGroups(callback) {
		$http.get(baseAPIUrl + "/groups").
			success(function(data, status, headers, config) {
		    // this callback will be called asynchronously
		    // when the response is available
		    $scope.groups = JSON.parse(data);
		    callback();
		  }).
		  error(function(data, status, headers, config) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		  });
	}

	$scope.submitComment = function(event, taskId) {
		var target = event.target || event.srcElement;
		target = target.querySelector("textarea");
		var url = baseAPIUrl + "/tasks/" + taskId + "/comment";
		$http.post(url, {comment: target.value}).
			success(function(data, status, headers, config) {
		    // this callback will be called asynchronously
		    // when the response is available
		  }).
		  error(function(data, status, headers, config) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		  });
	}

	$scope.createNewGroup = function() {
		var groupName = document.getElementById("groupNameInput").value;
		var url = baseAPIUrl + "/groups";
		$http.post(url, { name: groupName }, {withCredentials: true}).
			success(function(data, status, headers, config) {
				$http.post(baseAPIUrl + "groups/add/" + data.group._id).success(function(data) {

				})
		    $scope.user.groups.push(data.group);
		  }).
		  error(function(data, status, headers, config) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		  });
	}

	$scope.setGroup = function(group) {
		$scope.group = group;
	}

	$scope.initUserData = function() {
		if (!$scope.user) {
			$http.get(baseAPIUrl + "/success", {withCredentials: true}).
				success(function(data) {
			    // this callback will be called asynchronously
			    // when the response is available
			    $scope.user = data.user;
			  });
			}
	}

	$scope.initTasksData = function() {
		$http.get(baseAPIUrl + "/groups/" + $scope.group.id, {withCredentials: true}).
				success(function(data) {
			    // this callback will be called asynchronously
			    // when the response is available
			    $scope.tasks = {};
			    for (var taskId in data.tasks) {
			    	$http.get(baseAPIUrl + "/tasks", {withCredentials: true}).
							success(function(data) {
						    // this callback will be called asynchronously
						    // when the response is available
						    $scope.tasks[taskId] = data;
						  });
			    }
			});
	}

}]);