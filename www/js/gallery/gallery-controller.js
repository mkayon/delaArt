(function () {
    'use strict';

    angular.module('gallery').controller("galleryController", [
        '$scope',
        '$ionicSlideBoxDelegate',
        function ($scope, $ionicSlideBoxDelegate) {

            function  loadImages () {
                for (var i = 1; i < 7; i++) {
                    var url = "img/slide-" + i.toString() + ".jpeg";
                    $scope.images.push({ id: i, src: url });
                }
            }


            $scope.navSlide = function (index) {
                $ionicSlideBoxDelegate.slide(index, 500);
            }

            function init() {
                $scope.images = [];
                loadImages();
            }
            
            init();
        }
    ]);

})();