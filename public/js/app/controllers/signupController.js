angular.module('app').controller('SignupController', ['$scope', '$http', function ($scope, $http) {
    $scope.user = {
        displayname: '',
        username: '',
        email: '',
        password: '',
        confirmpassword: ''
    };
    $scope.usernameAvailable = false;
    $scope.emailAvailable = false;
    $scope.passwordMatch = false;
    $scope.displaynameValid = false;
    $scope.validForm = false;

    $scope.formChange = false;

    var usernameExists = function () {
        $http.get('/auth/username/' + $scope.user.username)
            .then(function (response) {
                if (response.data.exists === 'true') {
                    console.log('username unavailable');
                    $scope.usernameAvailable = false;
                    $scope.formChange = !$scope.formChange;
                    return true;
                } else if (response.data.exists === 'false') {
                    console.log('username available');
                    $scope.usernameAvailable = true;
                    $scope.formChange = !$scope.formChange;
                    return false;
                } else {
                    console.log('username error');
                    $scope.usernameAvailable = false;
                    $scope.formChange = !$scope.formChange;
                    return true;
                }
            });
    };

    var emailExists = function () {
        $http.get('/auth/email/' + $scope.user.email)
            .then(function (response) {
                if (response.data.exists === 'true') {
                    $scope.emailAvailable = false;
                    $scope.formChange = !$scope.formChange;
                    return true;
                } else if (response.data.exists === 'false') {
                    $scope.emailAvailable = true;
                    $scope.formChange = !$scope.formChange;
                    return false;
                } else {
                    $scope.emailAvailable = false;
                    $scope.formChange = !$scope.formChange;
                    return true;
                }
            });
    };

    var isPasswordMatch = function () {
        if ($scope.user.password && $scope.user.confirmpassword) {
            $scope.passwordMatch = $scope.user.password.localeCompare($scope.user.confirmpassword) === 0 ? true : false;
        } else {
            $scope.passwordMatch = false;
        }
    };

    $scope.$watch('user.displayname', function (newValue, oldValue) {
        if ($scope.user.displayname && $scope.user.displayname.length >= 1) {
            $scope.displaynameValid = true;
        } else {
            $scope.displaynameValid = false;
        }
        $scope.formChange = !$scope.formChange;
    }, true);

    $scope.$watch('user.username', function (newValue, oldValue) {
        if ($scope.user.username && $scope.user.username.length >= 4) {
            usernameExists();
        } else {
            $scope.usernameAvailable = false;
        }
        $scope.formChange = !$scope.formChange;
    }, true);

    $scope.$watch('user.email', function (newValue, oldValue) {
        if ($scope.user.email) {
            emailExists();
        } else {
            $scope.emailAvailable = false;
        }
        $scope.formChange = !$scope.formChange;
    }, true);

    $scope.$watch('user.password', function (newValue, oldVale) {
        if ($scope.user.password && $scope.user.password.length > 5) {
            isPasswordMatch();
        }
        $scope.formChange = !$scope.formChange;

    }, true);

    $scope.$watch('user.confirmpassword', function (newValue, oldVale) {
        if ($scope.user.password && $scope.user.password.length > 5) {
            isPasswordMatch();
        }
        $scope.formChange = !$scope.formChange;
    }, true);

    $scope.$watch('formChange', function (newValue, oldVale) {
        console.log($scope.user);
        console.log($scope.usernameAvailable);
        console.log($scope.emailAvailable);
        console.log($scope.passwordMatch);

        if ($scope.usernameAvailable && $scope.emailAvailable && $scope.passwordMatch) {
            $scope.validForm = true;
        } else {
            $scope.validForm = false;
        }
    }, true);
}]);