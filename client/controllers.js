var myApp = angular.module('myApp',[]);

myApp.controller('Controller', ['$scope', function($scope) {
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
}]);