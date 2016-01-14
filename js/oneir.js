
(function() {

var mymodule = angular.module('oneir', []);

mymodule.controller("oneircontrol", ['$scope', '$http', function($scope, $http) {
	$scope.host = '';

	$scope.off = function() {
		$http({
			method: 'POST',
			url: $scope.host + '/api/v1/oneir/command',
			headers : {
				'Content-Type' : 'application/json',
				'Accept-Type' : 'application/json',
			},
			data : { 'command' : 'off' }
		}).then(function(response) { console.log(response) },
			function(response) { console.log(response) });
	};
}]);


})();
