(function () {
    'use strict';

    angular.module('dela').controller("appController", [
        "$scope",
        "$ionicModal",
        "$ionicPopup",
        "$timeout",       
        "firebaseAuthenticationService",
        function ($scope, $ionicModal, $ionicPopup, $timeout, firebaseAuthenticationService /*, ngFB*/) {

            // With the new view caching in Ionic, Controllers are only called
            // when they are recreated or on app start, instead of every page change.
            // To listen for when this page is active (for example, to refresh data),
            // listen for the $ionicView.enter event:
            //$scope.$on('$ionicView.enter', function(e) {
            //});

            $scope.isAuthenticated = false;

            // Form data for the login modal
            $scope.loginData = {};

            // Create the login modal that we will use later
            $ionicModal.fromTemplateUrl('js/components/navigation/login.html', {
                scope: $scope
            }).then(function (modal) {
                $scope.modal = modal;
            });

            // Triggered in the login modal to close it
            $scope.closeLogin = function () {
                $scope.modal.hide();
            };

            // Open the login modal
            $scope.login = function () {
                $scope.modal.show();
            };

            // Perform the login action when the user submits the login form
            $scope.doLogin = function () {
                console.log('Doing login', $scope.loginData);
                               

                 firebaseAuthenticationService.loginWithUserNameAndPassword($scope.loginData)
                 .then(function(authData) {
                     $scope.authData = authData;
                     $scope.isAuthenticated = true;
                     $scope.closeLogin();
                  }).catch(function(error) {
                      $ionicPopup.alert({
                            title: 'Login Failed',
                            template: error
                        });
                  });
                             // $scope.isAuthenticated = authOk;

                 //if (authOk){
                 //   $scope.closeLogin();
                 //}
                 //else{
                 //       $ionicPopup.alert({
                 //           title: 'Login Failed',
                 //           template: 'Please enter valid credentials!'
                 //       });
                 //}

                                // Simulate a login delay. Remove this and replace with your login
                // code if using a login system
                //$timeout(function () {
                //    $scope.closeLogin();
                //}, 1000);
            };

            $scope.fbLogin = function () {
                console.log('Doing FB login');
                //email,public_profile, read_stream,publish_actions
                //ngFB.login({ scope: 'email' }).then(
                //    function (response) {
                //        if (response.status === 'connected') {
                //            console.log('Facebook login succeeded');
                //            $scope.closeLogin();
                //        } else {
                //            alert('Facebook login failed');
                //        }
                //    });
            };
        }]
    )
})();