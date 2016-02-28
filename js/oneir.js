
(function() {

var oneir = angular.module('oneir', []);

oneir.factory("localconfig", [ function () {
    var watches = {};
    return {
        get : function(key) {
            return localStorage.getItem(key);
        },
        set : function(key, newval) {
            localStorage.setItem(key, newval);

            if (key in watches) {
                var updates = watches[key];
                var length = updates.length;

                for (i = 0; i < length; i++) {
                    updates[i](key, newval);
                }
            }
        },
        watch : function(key, f) {
            if (!(key in watches)) {
                watches[key] = [];
            }
            var updates = watches[key];
            updates.push(f);
        }
    };
}]);

oneir.factory("oneir", [ 'localconfig', '$http', function (localconfig, $http) {
    return {
        send_rc5 : function(system, command) {
            $http({
                method : 'POST',
                url : localconfig.get('oneirurl'),
                data : JSON.stringify({
                    "command" : {
                        "type" : "rc5",
                        "command" : {
                            "address" : system,
                            "code" : command
                        }
                    }
                })
            });
        }
    };
}]);

oneir.controller("oneircfgctrl", [ '$scope', 'localconfig', function($scope, localconfig) {
    $scope.url = localconfig.get("oneirurl");
    if ($scope.url === null)
        $scope.url = "";

    $scope.$watch('url', function() {
        localconfig.set('oneirurl', $scope.url);
    });

    localconfig.watch('oneirurl', function(key, newval) {
        $scope.url = newval;
    });
}]);

oneir.controller("oneirrc5", [ "$scope", "oneir", function($scope, oneir) {
    $scope.address = 0;
    $scope.code = 0;
    $scope.send = function() {
        oneir.send_rc5($scope.address, $scope.code);
    };
}]);

})();
