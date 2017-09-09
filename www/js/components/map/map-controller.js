(function () {
    'use strict';

    angular.module('mapWithGoogleMaps').controller("mapController", [
        '$scope',
        '$ionicLoading',
        '$compile',         
        function ($scope,  $ionicLoading, $compile) {
            
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
            function initializeGoogleMap() {
                
                
                var myLatlng = new google.maps.LatLng(39.1107774, -84.4353084);

                
                var mapOptions = {
                    center: myLatlng,                    
                    zoom: 16,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };

                var map = new google.maps.Map(document.getElementById("map"),
                    mapOptions);

                //Marker + infowindow + angularjs compiled ng-click
                var contentString = "<div><a ng-click='clickTest()'>De la Arts Place. 3833 Eastern Ave, Cincinnati, Ohio 45226</a></div>";
                var compiled = $compile(contentString)($scope);

                var infowindow = new google.maps.InfoWindow({
                    content: compiled[0]
                });

                var marker = new google.maps.Marker({
                    position: myLatlng,
                    map: map,
                    title: 'De la Arts Place. 3833 Eastern Ave, Cincinnati, Ohio 45226',
                    address:"3833 Eastern Ave, Cincinnati, Ohio 45226"
                });

                google.maps.event.addListener(marker, 'click', function () {
                    infowindow.open(map, marker);
                });

                $scope.map = map;
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

            function init() {

                $scope.map = {};

                initializeGoogleMap();

               }

            init();

        }
    ]);

})();