angular.module('app').controller('CommentController', ['$scope', '$http', function ($scope, $http) {
    $scope.comments = {};
    $scope.com = '';

    console.log('Post ID is ' + $scope.postId);
    console.log($scope.postId);

    $scope.$watch('$scope.postId ', function () {
        getComments();
    });

    var getComments = function () {
        $http.get('/comments/' + $scope.postId)
            .then(function (response) {
                $scope.comments = response.data;
                console.log("Comments are ");
                console.log($scope.comments);
            });
    };

    $scope.addComment = function () {
        var data = {
            comment: $scope.com
        };
        $http.post(('/comments/' + $scope.postId), data)
            .then(function (response) {
                console.log(response);
                if (response.data.success) {
                    console.log('Success!');
                    $scope.com = '';
                    getComments();
                } else {
                    console.log('Error!');
                }
            });
    };
}]);