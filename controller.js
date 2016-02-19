/**
 * Created by 46066294p on 18/02/16.
 */
app.controller("TweetCtrl", ["$scope", "chatMessages",
    // we pass our new chatMessages factory into the controller
    function($scope, chatMessages) {
        $scope.user = "Marc Cano";

        // we add chatMessages array to the scope to be used in our ng-repeat
        $scope.messages = chatMessages;

        $scope.img = chatMessages;

        // a method to create new messages; called by ng-submit
        $scope.addMessage = function() {
            // calling $add on a synchronized array is like Array.push(),
            // except that it saves the changes to our database!
            $scope.messages.$add({
                user: $scope.user,
                text: $scope.message
            });

            // reset the message input
            $scope.message = "";
        };


        // if the messages are empty, add something for fun!
        $scope.messages.$loaded(function() {
            if ($scope.messages.length === 0) {
                $scope.messages.$add({
                    user: "Firebase Docs",
                    text: "Hello world!"
                });
            }
        });
    }
]);

app.factory("chatMessages", ["$firebaseArray",
    function($firebaseArray) {
        // create a reference to the database location where we will store our data
        var ref = new Firebase("https://ecaibtweet.firebaseio.com/tweets");

        // this uses AngularFire to create the synchronized array
        return $firebaseArray(ref);
    }
]);