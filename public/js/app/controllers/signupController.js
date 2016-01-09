angular.module('app').controller('SignupController', ['$scope', '$http', function ($scope, $http) {
    $scope.username = '';
    $scope.email = '';
    $scope.displaName = '';
    $scope.password = '';
    $scope.confirmPassword = '';

    $scope.user = '';

    $scope.usernameExists = function () {
        $http.get('/auth/username/' + $scope.user.username)
            .then(function (response) {
                console.log(response);
                if (response.data.exists === 'true') {
                    console.log('True');
                    return true;
                } else if (response.data.exists === 'false') {
                    console.log('False');
                    return false;
                } else {
                    console.log('Error!');
                    return true;
                }
            });
    };

    $scope.emailExists = function () {
        $http.get('/auth/email/' + $scope.user.email)
            .then(function (response) {
                console.log(response);
                if (response.data.exists === 'true') {
                    console.log('True');
                    return true;
                } else if (response.data.exists === 'false') {
                    console.log('False');
                    return false;
                } else {
                    console.log('Error!');
                    return true;
                }
            });

    };

    $scope.passwordMatch = function () {
        return $scope.user.password === $scope.user.confirmPassword;
    };

    $scope.signupSubmit = function () {

        console.log($scope.user);

        if ($scope.emailExists()) {
            console.log('Email Exists');
        }
        if ($scope.usernameExists()) {
            console.log('Username Exists');
        }
        /*    if ($scope.passwordMatch()) {
                console.log('Passwords Match!');
            }
        */
    };
}]);