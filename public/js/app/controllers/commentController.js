angular.module('app').controller('CommentController', ['$scope', '$http', function ($scope, $http) {
    $scope.comments = [
        {
            username: 'Ash',
            date: Date.now(),
            comment: 'Cool beans',
            link: '/google.com'
                    },
        {
            username: 'Ash',
            date: Date.now(),
            comment: 'Cool beans',
            link: 'html'
                    },
        {
            username: 'Ash',
            date: Date.now(),
            comment: 'Cool beans',
            link: 'html'
                    }
        ];
}]);