angular.module('app').controller('CommentController', ['$scope', '$http', function ($scope, $http) {
    $scope.comments = {};
    $scope.com = '';

    console.log('Post ID is ' + $scope.postId);
    console.log($scope.postId);
    $scope.$watch('$scope.postId ', function () {
        getComments();
    });
}]);