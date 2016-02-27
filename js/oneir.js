
(function() {

var oneir = angular.module('oneir', []);

oneir.controller("oneircfgctrl", [ '$scope', function($scope) {
    $scope.url = localStorage.getItem("oneirurl");
    if ($scope.url === null)
        $scope.url = "";

    $scope.$watch('url', function() {
        localStorage.setItem("oneirurl", $scope.url);
    });
    
}]);

})();
