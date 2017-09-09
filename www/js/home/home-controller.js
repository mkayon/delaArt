(function () {
    'use strict';

    angular.module('home').controller("homeController", [
        '$scope',
        '$ionicModal',
         '$ionicLoading',
         '$compile',
         '$timeout',
         '$ionicActionSheet',
         'homepageDataService',
         'firebaseAuthenticationService',
        function ($scope, $ionicModal, $ionicLoading, $compile, $timeout, $ionicActionSheet, homepageDataService, firebaseAuthenticationService) {

            var emergencyRef;
            


            //---------------------------------------------------------------------------------
            // iniScope
            //---------------------------------------------------------------------------------
            function initScope() {
                
                $scope.contactModal = {};
                $scope.mapModal = {};
                $scope.swiper = {};
                $scope.searchData = { firstName: "", lastName: "" };
                $scope.viewModel = {
                    showWarning: false,
                    warning: "",
                    showCallAboutClassesTitle: true,
                    callAboutClassesTitle: "(513) 871-0914 to inquire about classes and to register",
                    showCurrentSession: true,
                    currentSession: "9 Week Sessions Beginning Oct 26th"
                };

            }



            function loadData() {
                //data.emergency
            //    "emergency":{
            //        "show": true,
            //        "text": "Schoool is closed today!"
            //    },
            //    "callAboutClasses": {
            //        "show": true,
            //        "text":  "(513) 871-0914 to inquire about classes and to register"
            //    },
            //"currentSession": {
            //    "show": true,
            //    "text": "9 Week Sessions Beginning Oct 26th"
            //}


                homepageDataService.getData().then(
                    function (serverData) {
                        if (serverData) {
                            $scope.viewModel.showWarning = serverData.data.messages.emergency.show;
                            $scope.viewModel.warning = serverData.data.messages.emergency.text;
                            $scope.viewModel.showCallAboutClassesTitle = serverData.data.messages.callAboutClasses.show;
                            $scope.viewModel.callAboutClassesTitle = serverData.data.messages.callAboutClasses.text;
                            $scope.viewModel.showCurrentSession = serverData.data.messages.currentSession.show;
                            $scope.viewModel.currentSession = serverData.data.messages.currentSession.text;
                        }
                    }
                    );

                //var notificationData = homepageDataService.getNotificationData();
                //// to take an action after the data loads, use the $loaded() promise
                //notificationData.$loaded().then(function () {
                //    //console.log("loaded record:", notificationData.$id);
                //    // To make the data available in the DOM, assign it to $scope
                //    $scope.savedData = notificationData;
                //    // To iterate the key/value pairs of the object, use angular.forEach()
                //    angular.forEach(notificationData, function (value, key) {
                //        console.log(key, value.$id, value.show, value.text);
                //        switch (value.$id) {
                //            case "Closed":
                //                if (value.show) {
                //                    $scope.viewModel.showWarning = true;
                //                    $scope.viewModel.warning = value.text;                                    
                //                }
                //                break;
                //            case "Emergency":
                //                if (value.show) {
                //                    $scope.viewModel.showWarning = true;
                //                    $scope.viewModel.warning = value.text;

                //                }
                //                break;                            
                //        }
                //    });
                //});
            }

            //var mapOptions =
            //{
            //    maptype: google.maps.MapTypeId.ROADMAP,
            //    zoomControl: true,
            //    panControl: false,
            //    scaleControl: false,
            //    streetViewControl: true,
            //    zoom: 16,
            //    markers: [{"address":"3833 Eastern Ave, Cincinnati, Ohio 45226","html":"<span class=\"locationlabel\">Location:</span><br /><span class=\"location\">3833 Eastern Ave, Cincinnati, Ohio 45226</span><br /><span class=\"directions\">Get directions: <a href=\"http://maps.google.com/maps?daddr=3833%20Eastern%20Ave,%20Cincinnati,%20Ohio%2045226\">To here</a> - <a href=\"http://maps.google.com/maps?saddr=3833%20Eastern%20Ave,%20Cincinnati,%20Ohio%2045226\">From here</a><span>","popup":"true"}]
            //}

            // Google map initialization
            function initMaps() {

                var myLatlng = new google.maps.LatLng(39.1107774, -84.4353084);

                var mapOptions = {
                    center: myLatlng,
                    zoom: 16,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                var map = new google.maps.Map(document.getElementById("map"),
                    mapOptions);

                //Marker + infowindow + angularjs compiled ng-click
                var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
                var compiled = $compile(contentString)($scope);

                var infowindow = new google.maps.InfoWindow({
                    content: compiled[0]
                });

                var marker = new google.maps.Marker({
                    position: myLatlng,
                    map: map,
                    title: 'Uluru (Ayers Rock)'
                });

                google.maps.event.addListener(marker, 'click', function () {
                    infowindow.open(map, marker);
                });


                $scope.map = map;
            };

            $scope.isUserAuthenticated = function (){ return firebaseAuthenticationService.getIsAuthenticated();}

            $scope.showFaceBook = function () {
             console.log("showFaceBook ")
                var ref = cordova.InAppBrowser.open('https://www.facebook.com/De-la-Dance-Center-168222577863', '_system', 'location=yes');
                //_system
            }

            
            $scope.showInfoActions = function () {

                $ionicActionSheet.show({
                    titleText: 'De la Dance Info',
                    buttons: [
                      { text: '<i class="positive icon ion-ios-telephone"></i> <span class="positive">Contact Us</span>' },
                      { text: '<i class="balanced icon ion-ios-location"></i> <span class="balanced">Find Us</span>' },
                    ],
                    cancelText: 'Close',
                    cancel: function () {
                        console.log('CANCELLED');
                    },
                    buttonClicked: function (index) {
                        switch (index) {
                            case 0:
                                $scope.showContact();
                                break;
                            case 1:
                                $scope.showMap()();
                                break;
                        }
                        console.log('BUTTON CLICKED', index);
                        return true;
                    }
                });
            }

            $scope.centerOnMe = function () {
                if (!$scope.map) {
                    return;
                }

                $scope.loading = $ionicLoading.show({
                    content: 'Getting current location...',
                    showBackdrop: false
                });

                navigator.geolocation.getCurrentPosition(function (pos) {
                    $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
                    $scope.loading.hide();
                }, function (error) {
                    alert('Unable to get location: ' + error.message);
                });
            };

            $scope.clickTest = function () {
                alert('Example of infowindow with ng-click');
            };


            //contact Modal
            $ionicModal.fromTemplateUrl('js/components/contact/contact-modal.html', {
                scope: $scope
            }).then(function (modal) {
                $scope.contactModal = modal;
            });

            $scope.closeContact = function () {
                $scope.contactModal.hide();
            };

            $scope.showContact = function () {

                $scope.contactModal.show();
            }

            $scope.$on('$destroy', function () {
                $scope.contactModal.remove();
                $scope.mapModal.remove();
            });


            // Create the Map modal that we will use later
            $ionicModal.fromTemplateUrl('js/components/map/map-modal.html', {
                scope: $scope
            }).then(function (modal) {
                $scope.mapModal = modal;

            });

            // Triggered in the login modal to close it
            $scope.closeMap = function () {
                $scope.mapModal.hide();
            };

            // Open the login modal
            $scope.showMap = function () {
                $scope.mapModal.show();
                initMaps();
                //$timeout(function () {

                //    initMaps();

                //    google.maps.event.addDomListener(window, 'resize', function () {
                //        var lastCenter = $scope.map.getCenter();
                //        google.maps.event.trigger($scope.map, 'resize');
                //        $scope.map.setCenter(lastCenter);
                //    });

                //    google.maps.event.trigger($scope.map, 'resize');
                //    $scope.map.setCenter(new google.maps.LatLng(43.07493, -89.381388));
                //}, 0);                
            };


            // Swiper
            $scope.onReadySwiper = function (swiper) {

                swiper.on('slideChangeStart', function () {
                    console.log('slide start');
                });

                swiper.on('onSlideChangeEnd', function () {
                    console.log('slide end');
                });
            };

            function showEmergencyTextIfNeeded(snapshot) {

                var data = snapshot.val();
                if (data) {
                    $scope.viewModel.showWarning = data.show;
                    console.log(data.show);
                    if ($scope.viewModel.showWarning == true) {
                        console.log(data.text);
                        $scope.viewModel.warning = data.text;
                    }
                    $scope.$digest();
                }
            }

            function init() {

                initScope();
                loadData();

                emergencyRef = homepageDataService.getEmergencyRef();
                emergencyRef.on("value", showEmergencyTextIfNeeded);
            }


            init();
        }
    ]);

})();