var app = angular.module('TweetSearch', []);
app.controller('Controller', ['$scope', '$http', '$sce', function($scope, $http, $sce) {

    $scope.Search = function() {
        $scope.spinner = true;
        var QueryCommand = 'http://api.loklak.org/api/user.json?callback=JSON_CALLBACK&screen_name=' + $scope.query +
            '&followers=1000&following=1000';

        $http.jsonp(String(QueryCommand)).success(function(response) {

            var data = response;
            var followers = data.topology.followers;
            var following = data.topology.following;
            var followerslist = [];
            var followinglist = [];

            for (var i = 0; i < followers.length; i++) {
                user = followers[i].screen_name;
                name = followers[i].name;
                followers_count = followers[i].followers_count;
                following_count = followers[i].friends_count;
                pic = followers[i].profile_image_url;
                followerslist.push([user, pic, name, followers_count, following_count]);
            }

            for (var i = 0; i < following.length; i++) {
                user = following[i].screen_name;
                name = following[i].name;
                followers_count = following[i].followers_count;
                following_count = followers[i].friends_count;
                pic = following[i].profile_image_url;
                followinglist.push([user, pic, name, followers_count, following_count]);
            }

            $scope.followersStatus = followerslist;
            $scope.followingStatus = followinglist;
        });
    }
    $scope.spinner = false;
}]);
