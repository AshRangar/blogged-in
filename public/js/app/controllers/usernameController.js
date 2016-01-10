angular.module('app').controller('UsernameController', ['$scope', '$http', function ($scope, $http) {
    $scope.user = {
        username: ''
    };

    $scope.usernameAvailable = false;
    $scope.validForm = false;

    var usernameExists = function () {
        $http.get('/auth/username/' + $scope.user.username)
            .then(function (response) {
                if (response.data.exists === 'true') {
                    console.log('username unavailable');
                    $scope.usernameAvailable = false;
                    return true;
                } else if (response.data.exists === 'false') {
                    console.log('username available');
                    $scope.usernameAvailable = true;
                    return false;
                } else {
                    console.log('username error');
                    $scope.usernameAvailable = false;
                    return true;
                }
            });
    };

    $scope.$watch('user.username', function (newValue, oldVale) {
        console.log($scope.usernameAvailable);

        usernameExists();

        if ($scope.usernameAvailable) {
            $scope.validForm = true;
        } else {
            $scope.validForm = false;
        }
    }, true);
}]);