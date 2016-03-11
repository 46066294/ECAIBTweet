/**
 * Created by 46066294p on 18/02/16.
 */


app.controller('TweetCtrl', ["$scope", "getUser", "getUserTweets", "getFollowings", "getFollowingTweets",
    function($scope, getUser, getUserTweets, getFollowings, getFollowingTweets) {

        $scope.setUser = function() {
            $scope.userId = $scope.usuari;
            $scope.usuari = "";
            var dades = getUser($scope.userId);
            $scope.userName = dades.nom;
            $scope.userDesc = dades.desc;
            $scope.userTweets = getUserTweets($scope.userId);
            $scope.followings = getFollowings($scope.userId);
            $scope.followingTweets = getFollowingTweets($scope.userId);
        };

        $scope.tweet = function() {
            $scope.userTweets.$add({text: $scope.tweetTxt});
            $scope.tweetTxt = "";
        }

        $scope.follow = function() {
            $scope.followings.$add({idUser: $scope.usuari2Follow});
            $scope.usuari2Follow = "";
        }
/*
        $scope.followTweets = function() {
            $scope.followingTweets.$add({idUser: $scope.tweetsDeSeguidores});
            $scope.tweetsDeSeguidores = "";
        }*/

        $scope.followTweets = function() {
            $scope.followingTweets.$add({idUserTweet: $scope.follow()});
            $scope.tweetsDeSeguidores = "";
        }

    }]);

////////////////FACTORY///////////////////////////////////////
app.factory("getUser", ["$firebaseObject",
    function($firebaseObject) {
        return function(usuari) {
            var ref = new Firebase("https://ecaibtweet.firebaseio.com/users");

            return {nom: $firebaseObject(ref.child(usuari).child("name")),
                desc: $firebaseObject(ref.child(usuari).child("description"))};
        };
    }
]);

app.factory("getUserTweets", ["$firebaseArray",
    function($firebaseArray) {
        return function(usuari) {
            // create a reference to the database location where we will store our data
            var ref = new Firebase("https://ecaibtweet.firebaseio.com/users");
            return $firebaseArray(ref.child(usuari).child("tweets"));
        };
    }
]);

app.factory("getFollowings", ["$firebaseArray",
    function($firebaseArray) {
        return function(usuari) {
            var ref = new Firebase("https://ecaibtweet.firebaseio.com/users");
            return $firebaseArray(ref.child(usuari).child("following"));
        };
    }
]);

app.factory("getFollowingTweets", ["$firebaseArray",
    function($firebaseArray) {
        return function(usuari) {
            var ref = new Firebase("https://ecaibtweet.firebaseio.com/users");
            return $firebaseArray(ref.child(usuari.followings).child("tweets"));
        };
    }
]);